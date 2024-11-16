// Parts
const IronOre = {
    name:'Iron Ore',
    output: 1,
    manufacturingDuration: 1
};

const IronIngot = {
    name: 'Iron Ingot',
    from:[{part: IronOre, qty: 1}],
    output: 1,
    manufacturingDuration: 2, // 2 sec
}

const IronPlate = {
    name: 'Iron Plate',
    from:[{part:IronIngot, qty: 3}],
    output: 2,
    manufacturingDuration: 6 // 6 sec
}

const IronRod = {
    name: 'Iron Rod',
    from:[{part:IronIngot, qty: 1}],
    output: 1,
    manufacturingDuration: 4 // 4 sec
}

const Screw = {
    name: "Screw",
    from:[{part: IronRod, qty:1}],
    output: 4,
    manufacturingDuration: 6 // 6 sec
}

const ReinforcedIronPlate = {
    name: "Reinforced Iron Plate",
    from:[{part: IronPlate, qty:6 }, { part: Screw, qty:12 }],
    output: 1,
    manufacturingDuration: 12 // 12 sec
}

const Rotor = {
    name: "Rotor",
    from: [{ part: Screw, qty:25 }, {part: IronRod, qty:5}],
    output: 1,
    manufacturingDuration: 15 // 15 sec
}

const ModularFrame = {
    name: "Modular Frame",
    from:[{part:ReinforcedIronPlate, qty:3},{part:IronRod, qty:12}],
    output: 2,
    manufacturingDuration: 30 // 30 sec
}

const factor = (duration) => 60/duration;
const output = (part) => part.output * factor(part.manufacturingDuration);
const input = (part, idx) => part.from.at(idx).qty * factor(part.manufacturingDuration);

const ironSmleterCount = output(IronIngot);

function ironFactory(orePerMin){
    const ironSmleterCount = orePerMin / output(IronIngot);
    console.log(`Iron smleters: ${ironSmleterCount}`);

    // ingot
    const ingotPerMin = ironSmleterCount * output(IronIngot);
    console.log(`Ingots per min: ${ingotPerMin}`);

    // plates
    const plateCtorCount = ingotPerMin / input(IronPlate,0);
    console.log(`Plates ctor count: ${plateCtorCount}`);

    const platePerMin =  plateCtorCount * output(IronPlate);
    console.log(`Plates per min: ${platePerMin}`);

    // Rods
    const rodCtorCount = ingotPerMin / IronRod.from.at(0).qty;
    console.log(`Rod ctor count: ${rodCtorCount}`);
}


function walkToRoot(part){
    const tasks = [...part.from]

    do{
        const task = tasks.shift();
        console.log(task);
    }
    while(tasks.length > 0);
}

walkToRoot(ReinforcedIronPlate);

// ironFactory(360)