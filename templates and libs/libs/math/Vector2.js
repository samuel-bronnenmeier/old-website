class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	set(x, y) {
		this.x = x;
		this.y = y;
	}
	
	get() {
		var z = [this.x, this.y];
		return z;
	}
	
	add(other) {
		this.x += other.x;
		this.y += other.y;
	}
	
	static stAdd(one, other) {
		var x = one.x + other.x;
		var y = one.y + other.y;
		return new Vector2(x, y);
	}
	
	multNum(n) {
		this.x *= n;
		this.y *= n;
	}
	
	invert() {
		this.x = -(this.x);
		this.y = -(this.y);
	}
	
	copy() {
		return new Vector2(this.x, this.y)
	}
}