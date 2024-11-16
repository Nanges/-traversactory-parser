import { promises } from "fs";
import { RECIPES } from "./recipes";
import { Recipe, Part } from "./types";
import { parse } from "./parser/parser";

function dependentsFrom(parts:Part[]){
    return RECIPES.filter(r => r.inputs.find(i => parts.includes(i.part)) !== undefined);
}

function diff<T>(arrayRef:T[]){
    return (item:T) => arrayRef.indexOf(item) === -1;
}


function* dependentPartTree(parts:Part[]){
    const visitedRecipe: Recipe[] = [];

    do{
        const recipes: Recipe[] = dependentsFrom(parts)
            .filter(diff(visitedRecipe))
            //.filter(r => !r.alternate);
        
        for(const recipe of recipes){
            yield recipe.name;
            visitedRecipe.push(recipe);
        }

        parts = recipes.flatMap(r => r.outputs.map(r => r.part));
    }
    while(parts.length > 0);

    

    
}

// for(const recipe of dependentPartTree(['Iron Ore'])) {
//     console.log("Recipe name:", recipe);
// }



(async function(){
    const content = await promises.readFile('./en-US.json',{encoding:'utf-8'});
    const database: any[] = JSON.parse(content);
    
    // Resources

    const resourceDescriptor = "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'";
    const itemDescriptor = "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'";
    const recipeWrapperId = "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'";
    const manuFacturerWrapperId = "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'";

    const resourcesDesc = database.find(i => i.NativeClass === resourceDescriptor);
    // console.log(resourcesDesc.Classes.length);
    // console.log(resourcesDesc.Classes.map((c:DatabaseDescriptor) => [c.mDisplayName, c.ClassName]));

    // Items
    const itemDesc = database.find(i => i.NativeClass === itemDescriptor);
    // console.log(itemDesc.Classes.length);
    // console.log(itemDesc.Classes.map((c:any) => [c.mDisplayName, c.ClassName]));

    // Manufacturer
    const manufacturerWrapper = database.find(i => i.NativeClass === manuFacturerWrapperId);
    // console.log(manufacturerWrapper.Classes.length);
    // console.log(manufacturerWrapper.Classes.map((m:any) => [m.mDisplayName,m.ClassName]));

    // Manufacturer Variable
    const manufacturerVariablePower = database.find(i => i.NativeClass === "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'");
    // console.log(manufacturerVariablePower.Classes.length);
    // console.log(manufacturerVariablePower.Classes.map((m:any) => [m.mDisplayName,m.ClassName]));
    
    // Recipes
    const recipeWrapper = database.find(i => i.NativeClass === recipeWrapperId);
    // console.log(recipeWrapper.Classes
    //     .filter(produceInFilterPredicate([
    //         ...manufacturerWrapper.Classes.map((m:any) => m.ClassName),
    //         ...manufacturerVariablePower.Classes.map((m:any) => m.ClassName)
    //     ]))
    //     .map((r:any) => r.mDisplayName));

})();

function produceInFilterPredicate(manufacturers:string[]){
    return (item:any) => manufacturers.find(m => item.mProducedIn.indexOf(m) > -1);
}

const str = "((ItemClass=\"/Script/Engine.BlueprintGeneratedClass'/Game/FactoryGame/Resource/Parts/SAMIngot/Desc_SAMIngot.Desc_SAMIngot_C'\",Amount=1),(ItemClass=\"/Script/Engine.BlueprintGeneratedClass'/Game/FactoryGame/Resource/RawResources/Stone/Desc_Stone.Desc_Stone_C'\",Amount=24))";

const str2 = "((Type=CT_Soft,ClearanceBox=(Min=(X=-25.000000,Y=-400.000000,Z=-200.000000),Max=(X=25.000000,Y=400.000000,Z=200.000000),IsValid=True),RelativeTransform=(Translation=(X=0.000000,Y=0.000000,Z=200.000000))))";

const str3 = "(\"Foo\",\"Bar\",(Foo=5.2,Bar=6), (foo=(x=2,y=3)))"; // ["Foo","Bar",[["Foo",5],["Bar":6]]]

// ("Foo","Bar",(["Foo",5],["Bar",6]))

// console.log(parse(str3));
console.log(parse(str));
