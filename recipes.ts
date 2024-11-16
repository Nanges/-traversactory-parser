import { Recipe } from "./types";

export const RECIPES: Recipe[] = [
    {
        name:'Iron Ingot',
        durationInSec: 2,
        inputs:[{
            part:'Iron Ore',
            qty: 1
        }],
        outputs:[{
            part:'Iron Ingot',
            qty:1
        }],
        produceIn: "Smelter"
    },
    {
        name:'Copper Ingot',
        durationInSec: 2,
        inputs:[{
            part:'Copper Ore',
            qty: 1
        }],
        outputs:[{
            part:'Copper Ingot',
            qty: 1
        }],
        produceIn: "Smelter"
    },
    {
        name:'Alternate: Basic Iron Ingot',
        durationInSec: 12,
        inputs:[{
            part:'Iron Ore',
            qty: 5
        },{
            part: 'Limestone',
            qty: 8
        }],
        outputs: [{
            part:'Iron Ingot',
            qty: 10
        }],
        produceIn: 'Foundry',
        alternate: true
    },
    {
        name: 'Alternate: Iron Alloy Ingot',
        durationInSec: 5,
        inputs:[{
            part:'Iron Ore',
            qty:8
        },{
            part: 'Copper Ore',
            qty: 2
        }],
        outputs:[{
            part:'Iron Ingot',
            qty:15
        }],
        produceIn:'Foundry',
        alternate: true
    },
    {
        name: 'Iron Plate',
        durationInSec: 6,
        inputs:[{
            part:'Iron Ingot',
            qty:3
        }],
        outputs:[{
            part:'Iron Plate',
            qty: 2
        }],
        produceIn: 'Ctor'
    },
    {
        name:'Iron Rod',
        durationInSec: 4,
        inputs: [{
            part:'Iron Ingot',
            qty: 1
        }],
        outputs:[{
            part:'Iron Rod',
            qty: 4
        }],
        produceIn:'Ctor'
    },
    {
        name: 'Screw',
        inputs:[{
            part:'Iron Rod',
            qty:1
        }],
        outputs:[{
            part:'Screw',
            qty: 4
        }],
        durationInSec:6,
        produceIn:'Ctor'
    },
    {
        name:'Reinforced Iron Plate',
        durationInSec: 12,
        inputs:[{
            part:'Iron Plate',
            qty: 6
        },{
            part:'Screw',
            qty: 12
        }],
        outputs: [{
            part:'Reinforced Iron Plate',
            qty:1
        }],
        produceIn:'Assembler',
    },
    {
        name:'Rotor',
        durationInSec: 15,
        inputs:[{
            part:'Screw',
            qty:25
        },{
            part:'Iron Rod',
            qty:5
        }],
        outputs:[{
            part:'Rotor',
            qty: 1
        }],
        produceIn:'Assembler'
    },
    {
        name:'Modular Frame',
        durationInSec: 60,
        inputs:[{
            part: 'Reinforced Iron Plate',
            qty: 3
        },{
            part: 'Iron Rod',
            qty: 12
        }],
        outputs:[{
            part:'Modular frame',
            qty: 2
        }],
        produceIn:'Assembler'
    }
];