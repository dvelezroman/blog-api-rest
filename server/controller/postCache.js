class PostCacheRaw {
	constructor() {
		this.CACHE = {
			regs: 0,
			data: {},
		};
	}

	clearCache() {
		this.CACHE.regs = 0;
		for (let key in this.CACHE.data) delete this.CACHE.data[key];
	}

	getItem(key) {
		if (this.CACHE.data[key] !== undefined) {
			return this.CACHE.data[key];
		}
		return null;
	}

	setItem(post) {
		this.CACHE.regs += 1;
		this.CACHE.data[post.id] = post;
	}

	setItems(items) {
		this.CACHE.regs = items.length;
		items.forEach(function (item) {
			this.CACHE.data[item.email] = item;
		});
	}

	deleteItem(key) {
		if (this.CACHE[key] !== undefined) {
			this.CACHE.regs -= 1;
			delete CACHE[key];
		}
	}
}

const PostCache = new PostCacheRaw();
module.exports = PostCache;
