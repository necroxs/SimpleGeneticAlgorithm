const TARGET = "LET ME BE ME";
const POPULATION = 500;
const MUTATION_RATE = 0.01;
var pop = [];
var matingPool = [];
var Generation = 0;
//Initialize
function Initialize(){
    pop = [];
    document.getElementById("targetP").innerHTML = TARGET;
    document.getElementById("populationP").innerHTML = POPULATION;
    document.getElementById("mutationrateP").innerHTML = MUTATION_RATE;
    for(var i=0;i<POPULATION;i++){
        pop.push(new DNA(TARGET,MUTATION_RATE));
    }
}
function main(){
//Count Generation
    Generation++;
    document.getElementById("generationP").innerHTML = Generation;
  
//Re-initialize
    if(matingPool.length == 0){
        Initialize();
    }
//Cal fitness
    for(var i=0;i<pop.length;i++){
      
        pop[i].CalFitness();
        document.getElementById("result").innerHTML = pop[i].gene;
        if(pop[i].fitness == 1){
            clearInterval(Loop);
            console.log("Generation : " + Generation);
            console.log(pop);
            console.log(i);
            return;
        }
    }

//Build mating pool
    matingPool = [];
    for (var i = 0; i < pop.length; i++) {
    
            var n = pop[i].fitness * 100;
            for (var j = 0; j < n; j++) {
            matingPool.push(pop[i]);
            }
    }
//Reproduction
    for (var i = 0; i < pop.length; i++) {
        if(matingPool.length > 0){
            var a = Math.floor(Math.random() * matingPool.length);
            var b = Math.floor(Math.random() * matingPool.length);
            var PartnerA = matingPool[a];
            var PartnerB = matingPool[b];
            var child = PartnerA.Crossover(PartnerB);
            child.Mutate();
            pop[i] = child;
        }
    }



}

Loop = setInterval(function(){
    main();
},1);

