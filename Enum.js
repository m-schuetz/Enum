
class EnumItem{
	constructor(object){
		for(let key of Object.keys(object)){
			this[key] = object[key];
		}
	}

	inspect(){
		let entries = [];
		let keys = Object.keys(this).filter(key => key !== "name");
		keys = [ "name", ...keys ];
		for(let key of keys){
			let value = this[key];
			let entry = `${key}: ${value}`;

			entries.push(entry);
		}

		let entriesString = entries.join(", ");

		return `Enum(${entriesString})`;
	}

	toString(){
		return this.inspect();
	}
};

class Enum{

	constructor(object){
		this.object = object;

		for(let key of Object.keys(object)){
			let value = object[key];

			if(typeof value === "object"){
				value.name = key;
			}else{
				value = {name: key, value: value};
			}
			
			this[key] = new EnumItem(value);
		}

		{
			let entries = new Map();

			for(let key of Object.keys(this.object)){
				entries.set(key, this.object[key]);
			}

			this.entries = entries;
		}
	}


	fromValue(value){
		for(let key of Object.keys(this.object)){
			if(this[key].value === value){
				return this[key];
			}
		}

		throw new Error(`No enum for value: ${value}`);
	}
	
};