<template>
	<div class="homePage">
		<el-card class="card">
			<div slot="header">
				<div class="card-title">
					<span>简易版全景图</span>

					<div class="card-property">
						<span ref='property'></span>
					</div>

				</div>
			</div>

			<div class="card-content">
				<div ref='threeDom' class="model"></div>
				<div class="control">
					<span class="control-title">控制台</span>
					<div class="control-block">
						<span class="control-block-title">是否自动旋转</span>
						<el-radio-group v-model="isRotate" @change="isSpin">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import axios from 'axios';
	import * as THREE from "three";
	import * as TrackballControls from 'three-trackballcontrols'
	import * as ThreeStats from 'three-stats'
	import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
	const OrbitControls = require('three-orbit-controls')(THREE);

	export default {
		props: {
			msg: String
		},
		data() {
			return {
				renderer: '', //渲染器
				scene: '', //场景
				light: '', //光源
				camera: '', //相机
				controls: '', //控制器
				stats: '', //性能监控器
				mygroup: '', //模型组

				action: '', //控制动画的值
				clock: '', //时钟
				mixer: '', //混合实例
				rotateAnimate: '', //旋转动画
				isRotate: 1, //是否开启旋转

			}
		},

		mounted() {
			this.init(); //初始化
		},

		methods: {
			init() {
				this.$refs.threeDom.addEventListener('dblclick', this.onMouseDblclick); //监听双击事件
				this.rendererInit(); //创建渲染器
				this.sceneInit(); //创建场景    包含光源和辅助坐标系
				this.cameraInit(); //创建相机
				this.controlInit(); //初始化控制器
				this.propertyInit(); //性能监控
				this.modelling(); //建立模型
			},

			modelling(){ //开始建立模型
				this.mygroup = new THREE.Group();

				var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		
				//从服务器上取得图片
				// var link='http://192.168.0.170:9001/haems-web/modules/web/images/%E6%AD%A3%E9%9D%A2.png';	
				//vue加载图表需要用 require形式 从本地取,直接取本地是无法应用上的因为load只支持http协议 打包后变为file协议是无法使用的
				//所以必须取服务上的图片 然后在vue.config中配置跨域
				var img = textureLoader.load(require('../../public/img/home3.jpeg'));
				//var img = textureLoader.load(link); //vue加载图表需要用 require形式

				var geometry = new THREE.SphereGeometry(130, 256, 256); // 球体网格模型
				var material = new THREE.MeshLambertMaterial({
					map: img, //设置颜色贴图属性值
					side: THREE.DoubleSide, //双面渲染
				});
				var meshSphere = new THREE.Mesh(geometry, material); //网格模型对象Mesh	
				meshSphere.name = '球体容器';
				this.mygroup.add(meshSphere);

				var canvasText = this.getcanvers('进门'); //生成一个canvers 文字图案对象
				var texture = new THREE.CanvasTexture(canvasText);
				var geometryText = new THREE.PlaneGeometry(16, 10, 60, 60);
				var materialText = new THREE.MeshPhongMaterial({
					map: texture, // 设置纹理贴图
					side: THREE.DoubleSide, //双面渲染
				});
				var meshText = new THREE.Mesh(geometryText, materialText);
				meshText.name = '进门';
				meshText.position.set(40, 20, -90)
				this.mygroup.add(meshText);

				this.scene.add(this.mygroup);
				this.addAnimation(); //添加并开启动画
				this.refresh();
			},

			isSpin(val) { //开启和关闭旋转
				if (val == 0) { //关闭控制台		
					this.action.paused = true;
				} else {
					this.action.paused = false;
				}
			},

			addAnimation() { //添加并开启动画
				this.clock = new THREE.Clock(); // three.js 时钟对象
				var times = [0, 3600]; //	创建帧动画序列
				var position_x = [0, 360]; //离散属性值
				var keyframe = new THREE.KeyframeTrack('meshSphere.rotation[y]', times, position_x);
				var duration = 100; //持续时间
				var cilp = new THREE.AnimationClip('sphereRotate', duration, [keyframe]); //剪辑 keyframe对象
				this.mixer = new THREE.AnimationMixer(this.mygroup); //动画混合实例
				this.action = this.mixer.clipAction(cilp);
				this.action.timeScale = 1; //播放速度
				this.action.setLoop(THREE.LoopPingPong).play(); //开始播放 像乒乓球一样在起始点与结束点之间来回循环
				this.animate(); //开启动画
			},

			animate() { //循环渲染
				this.rotateAnimate = requestAnimationFrame(this.animate);
				this.renderer.render(this.scene, this.camera);
				this.update();
			},

			update() { //数据更新
				this.stats.update();
				this.mixer.update(this.clock.getDelta());
			},

			rendererInit() { //初始化渲染器
				var width = 1000; //窗口宽度
				var height = 800; //窗口高度
				this.renderer = new THREE.WebGLRenderer(); //创建渲染器
				this.renderer.setClearColor(0xffffff); //添加背景颜色
				this.renderer.setSize(width, height); // 设定渲染器尺寸
				this.$refs.threeDom.appendChild(this.renderer.domElement);
			},

			sceneInit() { //初始化场景 并向场景添加光源和辅助坐标系
				this.scene = new THREE.Scene();
				var ambient = new THREE.AmbientLight(0x444444, 3); //添加光源  颜色和光照强度
				var axisHelper = new THREE.AxesHelper(600); //添加辅助坐标系
				this.scene.add(ambient, axisHelper);
			},

			cameraInit() { //初始化相机
				var width = 800; //窗口宽度
				var height = 800; //窗口高度
				this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000); //使用透视相机
				this.camera.position.set(0, 0, 10); //设置相机位置
				this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相机看向
			},

			controlInit() { //初始化控制器
				this.controls = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
				this.controls.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
				this.controls.minDistance = 10; // 设置移动的最短距离（默认为零）
				this.controls.maxPolarAngle = Math.PI; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
			    this.controls.maxDistance = 30; // 设置移动的最长距离（默认为无穷）
				this.controls.enablePan = false; //禁用右键功能
				this.controls.addEventListener('change', this.refresh); //监听鼠标、键盘事件 让整个控件可以拖动
			},

			propertyInit() { //初始化性能监控
				this.stats = new ThreeStats.Stats(); // 创建一个性能监视器	
				this.stats.dom.style.position = 'absolute';
				this.stats.dom.style.top = '-4px';
				this.$refs.property.appendChild(this.stats.dom);
				this.stats.update();
			},

			getcanvers(text) { //生成一个canvers图案
				var canvasText = document.createElement("canvas");
				var c = canvasText.getContext('2d');
				// 矩形区域填充背景
				c.fillStyle = "#FFFFFF"; //canver背景
				c.fillRect(0, 0, 300, 200); //生成一个矩形
				c.translate(160, 80);
				c.fillStyle = "#000000"; //文本填充颜色
				c.font = "bold 100px 宋体"; //字体样式设置
				c.textBaseline = "middle"; //文本与
				c.textAlign = "center"; //文本居中
				c.fillText(text, 0, 0);

				var texture = new THREE.CanvasTexture(canvasText); //Canvas纹理
				var geometryText = new THREE.PlaneGeometry(16, 10, 60, 60); //生成一个矩形平面
				var materialText = new THREE.MeshPhongMaterial({
					map: texture, // 设置纹理贴图
					side: THREE.DoubleSide, //双面渲染
				});
				var meshText = new THREE.Mesh(geometryText, materialText);
				meshText.name = text;
				meshText.position.set(40, 20, -90);
				return canvasText;
			},

			refresh(){ //刷新页面 
				this.renderer.render(this.scene, this.camera); //执行渲染操作
				this.stats.update(); //更新性能监控的值			
			},

			onMouseDblclick(event) { //触发双击事件
				// 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
				var intersects = this.getIntersects(event);
				if (intersects.length != 0) {
					for (var item of intersects) {
						if (item.object.name != '') { //找到第一个不等于空的模型 就是自定义最近的模型
							this.action.paused = true; //停止旋转			
							this.$confirm('是否切换场景?', '提示', {
								confirmButtonText: '切换',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.action.paused = false; //开启旋转
								if (item.object.name == '进门') {
									this.changeScene('enter'); //改变页面场景
								} else if (item.object.name == '返回') {
									this.changeScene('backtrack'); //改变页面场景
								}
							}).catch(() => {
								this.action.paused = false; //开启旋转
							});
							break;
						}
					}
				} else { //这里是未选中状态
				}
			},

			changeScene(type) {
				var img = '';
				var names = '';
				var canvasText = '';
				var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		
				if (type == 'enter') {
					img = textureLoader.load(require('../../public/img/home1.jpg')); //vue加载图表需要用 require形式
					canvasText = this.getcanvers('返回'); //生成一个canvers 文字图案对象	
					names = '返回';
				} else if (type == 'backtrack') { //返回房间
					img = textureLoader.load(require('../../public/img/home3.jpeg')); //vue加载图表需要用 require形式	
					canvasText = this.getcanvers('进门'); //生成一个canvers 文字图案对象	
					names = '进门';
				}

				for (var item of this.scene.children[2].children) {
					if (item.name == '球体容器') { //切换贴图 进入下一张贴图					
						var material = new THREE.MeshLambertMaterial({
							map: img, //设置颜色贴图属性值
							side: THREE.DoubleSide, //双面渲染
						});
						item.material = material;
					} else if (item.name == '进门' || item.name == '返回') {
						var texture = new THREE.CanvasTexture(canvasText);
						var materialText = new THREE.MeshPhongMaterial({
							map: texture, // 设置纹理贴图
							side: THREE.DoubleSide, //双面渲染
						});

						item.name = names; //改名模型的名字
						item.material = materialText;
					}
				}

				setTimeout(() => { //延迟刷新
					this.refresh();
				}, 100)

			},

			getIntersects(event) { // 获取与射线相交的对象数组
				event.preventDefault();
				// 声明 raycaster 和 mouse 变量
				var raycaster = new THREE.Raycaster(); //生成射线
				var mouse = new THREE.Vector2();
				var container = this.$refs.threeDom;
				let getBoundingClientRect = container.getBoundingClientRect();
				// 通过鼠标点击位置,计算出 raycaster 所需点的位置 分量,以屏幕为中心点,范围 -1 到 1
				mouse.x = ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) * 2 - 1;
				mouse.y = -((event.clientY - getBoundingClientRect.top) / container.offsetHeight) * 2 + 1;
				//通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
				raycaster.setFromCamera(mouse, this.camera);
				// 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
				var intersects = raycaster.intersectObjects(this.scene.children[2].children);
				//返回选中的对象
				return intersects;
			},
		}
	}
</script>

<style>
	.homePage {
		position: absolute;
		height: 100%;
		width: 100%;
		font-size: 14px;
		color: #303133;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card {
		width: 1300px;
		height: 900px;
	}

	.card-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-title span {
		font-weight: 600;
		font-size: 18px;
	}

	.card-property {
		position: relative;
		width: 70px;
		height: 40px;
	}

	.card-content {
		display: flex;
		flex-direction: row;
	}

	.model {
		border: 1px solid #DCDFE6;
	}

	.control {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 800px;
		border: 1px solid #DCDFE6;
		border-left: none;
	}

	.control-title {
		font-size: 18px;
		font-weight: 600;
		text-align: center;
		color: #409EFF;
		padding: 10px;
		border-bottom: 1px solid #DCDFE6;
	}

	.control-block {
		padding: 10px;
		border-bottom: 1px solid #DCDFE6;
	}

	.control-block-title {
		display: block;
		margin-bottom: 5px;
	}

	/* 自定义element样式 */
	.el-card__header {
		padding: 10px 20px;
	}
</style>
