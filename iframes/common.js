	function SmoothTween(obj) {
		TWEEN.Tween.call(this, obj);
		this.easing(TWEEN.Easing.Quadratic.InOut);
	}
	SmoothTween.prototype = Object.create(TWEEN.Tween.prototype);



	function Axis() {
		THREE.Object3D.call(this);

		this.x = new THREE.ArrowHelper(
			new THREE.Vector3(1, 0, 0),
			new THREE.Vector3(0, 0, 0),
			0,
			0xff0000,
			.2, .2);
		this.add(this.x);
		this.x.line.material.transparent = true;
		this.x.cone.material.transparent = true;

		this.y = new THREE.ArrowHelper(
			new THREE.Vector3(0, 1, 0),
			new THREE.Vector3(0, 0, 0),
			0,
			0x00ff00,
			.2, .2);
		this.add(this.y);
		this.y.line.material.transparent = true;
		this.y.cone.material.transparent = true;

		this.z = new THREE.ArrowHelper(
			new THREE.Vector3(0, 0, 1),
			new THREE.Vector3(0, 0, 0),
			0,
			0x0000ff,
			.2, .2);
		this.add(this.z);
		this.z.line.material.transparent = true;
		this.z.cone.material.transparent = true;

		this.axisUpdate = function() {
			this.axis.setLength(this.m, .2, .2);
		}

		this.x.meter = { m: 0, axis: this.x };
		this.x.tween = new TWEEN.Tween(this.x.meter)
			.to({ m: 4 })
			.onUpdate(this.axisUpdate);
		this.y.meter = { m: 0, axis: this.y };
		this.y.tween = new TWEEN.Tween(this.y.meter)
			.to({ m: 4 })
			.onUpdate(this.axisUpdate);
		this.z.meter = { m: 0, axis: this.z };
		this.z.tween = new TWEEN.Tween(this.z.meter)
			.to({ m: 4 })
			.onUpdate(this.axisUpdate);
	}
	Axis.prototype = Object.create(THREE.Object3D.prototype);
	Axis.prototype.constructor = Axis;


	function Display(dw, dh, dsw, dsh) {
		var displayGeo = new THREE.BufferGeometry();
		var pixelGeo = new THREE.BufferGeometry();
		var pixelArray = [];

		THREE.Object3D.call(this);

		displayGeo.addAttribute('position', new THREE.BufferAttribute(new Float32Array([
			-dw, -dh, 0,
			dw, -dh, 0,
			dw,  dh, 0,
			-dw,  dh, 0,
			-dw, -dh, 0,
		]), 3));

		this.frame = new THREE.Line(displayGeo, new THREE.LineBasicMaterial({
			color: 0xffffff,
		transparent:true,
			linewidth: 3,
		}), THREE.LineStrip);

		for (var i = -dh + dsh; i < dh; i += dsh) {
			pixelArray.push(-dw);
			pixelArray.push(i);
			pixelArray.push(0);
			pixelArray.push(dw);
			pixelArray.push(i);
			pixelArray.push(0);
		}
		for (var i = -dw + dsw; i < dw; i += dsw) {
			pixelArray.push(i);
			pixelArray.push(-dh);
			pixelArray.push(0);
			pixelArray.push(i);
			pixelArray.push(dh);
			pixelArray.push(0);
		}
		pixelGeo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(pixelArray), 3));
		this.pixels = new THREE.Line(pixelGeo, new THREE.LineBasicMaterial({
			color: 0xffffff,
			transparent:true,
			opacity: .5,
			linewidth: .5,
		}), THREE.LinePieces);

		this.add(this.frame);
		this.add(this.pixels);

		this.renderBuffer = new THREE.WebGLRenderTarget(512, 512, {
			magFilter: THREE.NearestFilter,
			minFilter: THREE.NearestFilter,
			wrapS: THREE.ClampToEdgeWrapping,
			wrapT: THREE.ClampToEdgeWrapping
		});

		var planeGeo = new THREE.PlaneGeometry(dw * 2, dh * 2);
		var planeMat = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: this.renderBuffer,
			side: THREE.DoubleSide,
		});
		this.rendering = new THREE.Mesh(planeGeo, planeMat);
		this.add(this.rendering);
	}
	Display.prototype = Object.create(THREE.Object3D.prototype);
	Display.prototype.constructor = Display;


	var Point = function() {
		var pointMaterial = new THREE.PointCloudMaterial({
			color: 0xffffff,
			transparent: true,
			size: 0.25,
		});

		return function(v) {
			var geometry = new THREE.Geometry();
			geometry.vertices.push(new THREE.Vector3(0, 0, 0));
			var point = new THREE.PointCloud(geometry, pointMaterial);
			point.position.set(v.x, v.y, v.z);
			return point;
		}
	}();