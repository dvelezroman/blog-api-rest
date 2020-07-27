class UserCacheRaw {
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

	setItem(user) {
		this.CACHE.regs += 1;
		this.CACHE.data[user.email] = user;
	}

	setItems(users) {
		this.CACHE.regs = users.length;
		const updatedCache = {};
		users.forEach(user => {
			updatedCache[user.email] = user;
		});
		this.CACHE.data = updatedCache;
	}

	deleteItem(key) {
		if (this.CACHE[key] !== undefined) {
			this.CACHE.regs -= 1;
			delete CACHE[key];
		}
	}
}

const UserCache = new UserCacheRaw();
module.exports = UserCache;
