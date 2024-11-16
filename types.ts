export type IronPart = 
    | 'Iron Ore'
    | 'Iron Ingot'
    | 'Iron Plate'
    | 'Reinforced Iron Plate'
    | 'Screw'
    | 'Iron Rod'
    | 'Rotor'
    | 'Modular frame';

export type CopperPart = 
    | 'Copper Ore'
    | 'Copper Ingot';

export type LimestonePart = 
    | 'Limestone';

export type Part = IronPart | CopperPart | LimestonePart;

export type Building = 'Smelter'|'Ctor'|'Assembler'|'Foundry';

export type Ingredient = {
    part: Part;
    qty:number;
}

export type Product = Ingredient;

export type Recipe = {
    name: string;
    inputs: Ingredient[];
    outputs: Product[];
    durationInSec: number;
    produceIn: Building;
    alternate?:boolean;
}
