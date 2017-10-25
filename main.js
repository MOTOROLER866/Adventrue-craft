/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 15
*/



// file: header.js

var GUI_BAR_STANDART_SCALE = 3.2;

var FURNACE_FUEL_MAP = {
	5: 300,
	6: 100,
	17: 300,
	263: 1600,
	280: 100,
	268: 200,
	269: 200,
	270: 200,
	271: 200,
	85: 300,
	107: 300,
	134: 300,
	135: 300,
	158: 150,
	162: 300,
	163: 300,
	164: 300,
	184: 300,
	185: 300,
	186: 300,
	187: 300,
	53: 300,
	54: 300,
	58: 300
};

importLib("energylib", "*");

var energyRedstoneFlux = EnergyTypeRegistry.assureEnergyType("RF", 0.25);




// file: Api/define.js

var MachineRegistry = {
	machineIDs: {},
	
	isMachine: function(id){
		return this.machineIDs[id];
	},
	
	getMachineDrop(coords, blockID, standartDrop){
		var item = Player.getCarriedItem();
		if(item.id==ItemID.wrench){
			ToolAPI.breakCarriedTool(10);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			if(Math.random() < 0.8){return [[blockID, 1, 0]];}
			return [[standartDrop, 1, 0]];
		}
		if(item.id==ItemID.electricWrench && item.data < 200){
			Player.setCarriedItem(item.id, 1, Math.min(item.data+10, 200));
			World.setBlock(coords.x, coords.y, coords.z, 0);
			return [[blockID, 1, 0]];
		}
		return [[standartDrop, 1, 0]];
	},
	
	registerPrototype: function(id, Prototype){
		// register render
		// register ID
		this.machineIDs[id] = true;
		// setup energy value
		if (Prototype.defaultValues){
			Prototype.defaultValues.energy = 0;
		}
		else{
			Prototype.defaultValues = {
				energy: 0
			};
		}
		// copy functions
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		
		ToolAPI.registerBlockMaterial(id, "stone");
		TileEntity.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, energyRedstoneFlux);
	},
	
	// standart functions
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.energy;
		this.data.energy += src.getAll(energyNeed);
	}
}




// file: Api/recepis.js

var MachineRecipeRegistry = {
	recipeData: {},
	
	registerRecipesFor: function(name, data, validateKeys){
		if (validateKeys){
			var newData = {};
			for (var key in data){
				newData[eval(key)] = data[key];
			}
			data = newData;
		}
		this.recipeData[name] = data;
	},
	
	addRecipeFor: function(name, source, result){
		this.requireRecipesFor(name, true)[source] = result;
	},
	
	requireRecipesFor: function(name, createIfNotFound){
		if (!this.recipeData[name] && createIfNotFound){
			this.recipeData[name] = {};
		}
		return this.recipeData[name];
	},
	
	getRecipeResult: function(name, sourceKey){
		var data = this.requireRecipesFor(name);
		if (data){
			return data[sourceKey];
		}
	}
}




// file: items/axel & xeon/tool.js

IDRegistry.genItemID("xeonIngot");
Item.createItem("xeonIngot", "Xeon ingot", {name: "xeon"}, {});

IDRegistry.genItemID("axelIngot");
Item.createItem("axelIngot", "Axel ingot", {name: "axel"}, {});

importLib("ToolType", "*");

ToolAPI.addToolMaterial("xeon", {durability: 954, level: 4, efficiency: 10, damage: 2, enchantability: 14});

IDRegistry.genItemID("xeonSword");
Item.createItem("xeonSword", "Xeon sword", {name: "xeonSword"}, {stack: "1"});
ToolAPI.setTool(ItemID.xeonSword,  "xeon", ToolType.sword);

IDRegistry.genItemID("xeonPickaxe");
Item.createItem("xeonPickaxe", "Xeon pickaxe", {name: "xeonPickaxe"}, {stack: "1"});
ToolAPI.setTool(ItemID.xeonPickaxe, "xeon", ToolType.pickaxe);

IDRegistry.genItemID("xeonAxe");
Item.createItem("xeonAxe", "Xeon axe", {name: "xeonAxe"}, {stack: "1"});
ToolAPI.setTool(ItemID.xeonAxe, 
"xeon", ToolType.axe);

IDRegistry.genItemID("xeonHoe");
Item.createItem("xeonHoe", "Xeon hoe", {name: "xeonHoe"}, {stack: "1"});
ToolAPI.setTool(ItemID.xeonHoe,  "xeon", ToolType.hoe);

IDRegistry.genItemID("xeonShovel");
Item.createItem("xeonShovel", "Xeon shovel", {name: "xeonShovel"}, {stack: "1"});
ToolAPI.setTool(ItemID.xeonShovel,  "xeon", ToolType.shovel);

ToolAPI.addToolMaterial("axel", {durability: 425, level: 3, efficiency: 10, damage: 2, enchantability: 14});

IDRegistry.genItemID("axelSword");
Item.createItem("axelSword", "Axel sword", {name: "axelSword"}, {stack: "1"});
ToolAPI.setTool(ItemID.axelSword,  "axel", ToolType.sword);

IDRegistry.genItemID("axelPickaxe");
Item.createItem("axelPickaxe", "Axel pickaxe", {name: "axelPickaxe"}, {stack: "1"});
ToolAPI.setTool(ItemID.axelPickaxe, "axel", ToolType.pickaxe);

IDRegistry.genItemID("axelAxe");
Item.createItem("axelAxe", "Axel axe", {name: "axelAxe"}, {stack: "1"});
ToolAPI.setTool(ItemID.axelAxe,  "axel", ToolType.axe);

IDRegistry.genItemID("axelHoe");
Item.createItem("axelHoe", "Axel hoe", {name: "axelHoe"}, {stack: "1"});
ToolAPI.setTool(ItemID.axelHoe,  "axel", ToolType.hoe);

IDRegistry.genItemID("axelShovel");
Item.createItem("axelShovel", "Axel shovel", {name: "axelShovel"}, {stack: "1"});
ToolAPI.setTool(ItemID.axelShovel,  "axel", ToolType.shovel);

Recipes.addShaped({id: ItemID.xeonSword, count: 1, data: 0}, [
	"a",
	"a",
	"x"
], ['x', 280, 0, 'a', ItemID.xeonIngot, 0]);

Recipes.addShaped({id: ItemID.xeonPickaxe, count: 1, data: 0}, [
	"aaa",
	" x ",
	" x "
], ['x', 280, 0, 'a', ItemID.xeonIngot, 0]);

Recipes.addShaped({id: ItemID.xeonShovel, count: 1, data: 0}, [
	"a",
	"x",
	"x"
], ['x', 280, 0, 'a', ItemID.xeonIngot, 0]);

Recipes.addShaped({id: ItemID.xeonHoe, count: 1, data: 0}, [
	"aa",
	"x",
	"x"
], ['x', 280, 0, 'a', ItemID.xeonIngot, 0]);

Recipes.addShaped({id: ItemID.xeonAxe, count: 1, data: 0}, [
	"aa",
	"ax",
	" x"
], ['x', 280, 0, 'a', ItemID.xeonIngot, 0]);

Recipes.addShaped({id:
ItemID.axelSword, count: 1, data: 0}, [
	"a",
	"a",
	"x"
], ['x', 280, 0, 'a', ItemID.axelIngot, 0]);

Recipes.addShaped({id: ItemID.axelPickaxe, count: 1, data: 0}, [
	"aaa",
	" x ",
	" x "
], ['x', 280, 0, 'a', ItemID.axelIngot, 0]);

Recipes.addShaped({id: ItemID.axelShovel, count: 1, data: 0}, [
	"a",
	"x",
	"x"
], ['x', 280, 0, 'a', ItemID.axelIngot, 0]);

Recipes.addShaped({id: ItemID.axelHoe, count: 1, data: 0}, [
	"aa",
	"x",
	"x"
], ['x', 280, 0, 'a', ItemID.axelIngot, 0]);

Recipes.addShaped({id: ItemID.axelAxe, count: 1, data: 0}, [
	"aa",
	"ax",
	" x"
], ['x', 280, 0, 'a', ItemID.axelIngot, 0]);





// file: items/axel & xeon/ingots.js

Recipes.addFurnace(173, ItemID.axelIngot, 0);

Recipes.addFurnace(22, ItemID.xeonIngot, 0);




// file: items/lapadinye/ingots.js

IDRegistry.genItemID("lapadineCrystal");
Item.createItem("lapadineCrystal", "Lapadine crystal", {name: "lapadin_crystal"}, {});




// file: items/lapadinye/tool.js

ToolAPI.addToolMaterial("lapadin", {durability: 1789, level: 5, efficiency: 15, damage: 6, enchantability: 14});

IDRegistry.genItemID("lapadinsSword");
Item.createItem("lapadinsSword", "Lapadins sword", {name: "lapadins_sw"}, {stack: "1"});
ToolAPI.setTool(ItemID.lapadinsSword, "lapadin", ToolType.sword);

IDRegistry.genItemID("lapadinsPickaxe");
Item.createItem("lapadinsPickaxe", "Lapadins pickaxe", {name: "lapadins_pick"}, {stack: "1"});
ToolAPI.setTool(ItemID.lapadinsPickaxe, "lapadin", ToolType.pickaxe);

IDRegistry.genItemID("lapadinsAxe");
Item.createItem("lapadinsAxe", "Lapadins axe", {name: "lapadins_axe"}, {stack: "1"});
ToolAPI.setTool(ItemID.lapadinsAxe, "lapadin", ToolType.axe);

IDRegistry.genItemID("lapadinsHoe");
Item.createItem("lapadinsHoe", "Lapadins hoe", {name: "lapadins_hoe"}, {stack: "1"});
ToolAPI.setTool(ItemID.lapadinsHoe,  "lapadin", ToolType.hoe);

IDRegistry.genItemID("lapadinsShovel");
Item.createItem("lapadinsShovel", "Lapadins shovel", {name: "lapadins_sh"}, {stack: "1"});
ToolAPI.setTool(ItemID.lapadinsShovel, "lapadin", ToolType.shovel);




// file: items/lapadinye/craft.js

Recipes.addShaped({id:
ItemID.lapadinsSword, count: 1, data: 0}, [
	"a",
	"a",
	"x"
], ['x', 352, 0, 'a', ItemID.lapadineCrystal, 0]);

Recipes.addShaped({id: ItemID.lapadinsPickaxe, count: 1, data: 0}, [
	"aaa",
	" x ",
	" x "
], ['x', 352, 0, 'a', ItemID.lapadineCrystal, 0]);

Recipes.addShaped({id: ItemID.lapadinsShovel, count: 1, data: 0}, [
	"a",
	"x",
	"x"
], ['x', 352, 0, 'a', ItemID.lapadineCrystal, 0]);

Recipes.addShaped({id: ItemID.lapadinsHoe, count: 1, data: 0}, [
	"aa",
	"x",
	"x"
], ['x', 352, 0, 'a', ItemID.lapadineCrystal, 0]);

Recipes.addShaped({id: ItemID.lapadinsAxe, count: 1, data: 0}, [
	"aa",
	"ax",
	" x"
], ['x', 352, 0, 'a', ItemID.lapadineCrystal, 0]);





// file: items/time sword/define.js

IDRegistry.genItemID("timeSword");
Item.createItem("timeSword", "Frozen sword", {name: "frozen_sword"}, {stack: "1"});
ToolAPI.setTool(ItemID.timeSword, "lapadin", ToolType.sword);
//11133345




// file: items/time sword/effect.js

Callback.addCallback("PlayerAttack", function(player, victim){
if(Player.getCarriedItem() == ItemID.timeSword){
Entity.addEffect(mob, MobEffect.movementSlowdown, 600, 12);
}});




// file: items/dust/ice.js

IDRegistry.genItemID("iceDust");
Item.createItem("iceDust", "Ice dust", {name: "dust_ice"}, {});




// file: items/isum.js

IDRegistry.genItemID("izum");
Item.createFoodItem("izum", "Izum", {name: "izum"}, {});




// file: mobs/Kriptonia/Ho-jo.js

var hojo = MobRegistry.registerEntity("Ho-jo");
MobSpawnRegistry.registerSpawn("Ho-jo", .5); 




// file: title entity/cakaya.js

IDRegistry.genBlockID("iFurnace");
Block.createBlockWithRotation("iFurnace", [
	{name: "Печь", texture: [["no", 0]], inCreative: true}
]);

var guiHhhFurnace = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Iron Furnace"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 530, y: 146, bitmap: "furnace_bar_background", scale: GUI_BAR_STANDART_SCALE},
		{type: "bitmap", x: 450, y: 150, bitmap: "fire_background", scale: GUI_BAR_STANDART_SCALE}
	],
	
	elements: {
		"progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: GUI_BAR_STANDART_SCALE},
		"burningScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_BAR_STANDART_SCALE},
		"slotSource": {type: "slot", x: 441, y: 75},
		"slotFuel": {type: "slot", x: 441, y: 212},
		"slotResult": {type: "slot", x: 625, y: 142},
	}
});


MachineRegistry.registerPrototype(BlockID.iFurnace, {
	defaultValues: {
		progress: 0,
		burn: 0,
		burnMax: 0
	},
	
	getGuiScreen: function(){
		return guiHhhFurnace;
	},
	
	addTransportedItem: function(self, item, direction){
		var fuelSlot = this.container.getSlot("slotFuel");
		if(FURNACE_FUEL_MAP[item.id] && (fuelSlot.id==0 || fuelSlot.id==item.id && fuelSlot.data==item.data && fuelSlot.count < 64)){
			var add = Math.min(item.count, 64 - slotFuel.count);
			item.count -= add;
			fuelSlot.id = item.id;
			fuelSlot.data = item.data;
			fuelSlot.count += add;
			if(!item.count){return;}
		}
		
		var sourceSlot = this.container.getSlot("slotSource");
		if(sourceSlot.id==0 || sourceSlot.id==item.id && sourceSlot.data==item.data && sourceSlot.count < 64){
			var add = Math.min(item.count, 64 - sourceSlot.count);
			item.count -= add;
			sourceSlot.id = item.id;
			sourceSlot.data = item.data;
			sourceSlot.count += add;
			if(!item.count){return;}
		}
	},
	
	getTransportSlots: function(){
		return {input: ["slotSource", "slotFuel"], output: ["slotResult"]};
	},
	
	tick: function(){
		var sourceSlot = this.container.getSlot("slotSource");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		if(result && this.data.burn > 0){
			var resultSlot = this.container.getSlot("slotResult");
			if((resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0) && this.data.progress++ >= 160){
				sourceSlot.count--;
				resultSlot.id = result.id;
				resultSlot.data = result.data;
				resultSlot.count++;
				this.container.validateAll();
				this.data.progress = 0;
			}
		}
		else {
			this.data.progress = 0;
		}
		
		if(this.data.burn > 0){
			this.data.burn--;
		}
		else if(result){
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel");
		}
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("progressScale", this.data.progress / 160);
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if(fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if(burn){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				return burn;
			}
			if(LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data) == "lava"){
				var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
				fuelSlot.id = empty.id;
				fuelSlot.data = empty.data;
				return 20000;
			}
		}
		return 0;
	}
});




// file: Api/shraed.js

ModAPI.registerAPI("AdvAPI", {
	Machine: MachineRegistry,
	Recipe: MachineRecipeRegistry
});

Logger.Log("Adventue Craft API shared with name AdvAPI.", "API");




