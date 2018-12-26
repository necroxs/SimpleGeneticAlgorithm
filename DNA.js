const UTILITY = new Utility();
class DNA {
    constructor(target,mutationRate) {
        this.target = target;
        this.mutationRate = mutationRate;
        this.gene = this.GenerateGene(target.length);
        this.fitness = 0;
      }
    GenerateGene(long) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
      
        for (var i = 0; i < long; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
    CalFitness(){
        var score = 0;
        for(var i=0;i<this.gene.length;i++){
            if(this.gene[i] == this.target[i]){
                score++;
            }
        }
        this.fitness = score/this.target.length;
        return score/this.target.length;
    }

    Mutate(){
        for(var i=0;i<this.gene.length;i++){
         
            if(UTILITY.getRandomArbitrary(0,2) < this.mutationRate){
                this.gene = UTILITY.setCharAt(this.gene,i,this.GenerateGene(1));
            }
           
        }

    }
    Crossover(Partner){
        var child = new DNA(this.target,Partner.mutationRate);
    
        var midpoint = Math.floor(Math.random() * Partner.gene.length);
        for (var i = 0; i < Partner.gene.length; i++) {
          if (i > midpoint) {
            child.gene = UTILITY.setCharAt(child.gene,i,this.gene.charAt(i));
          }
          else{
            child.gene = UTILITY.setCharAt(child.gene,i,Partner.gene.charAt(i));
          }
        }
        return child;

    }
  

}