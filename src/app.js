export class App {
  configureRouter(config, router){
    this.router = router;
    config.title = 'Markets';

    let step = {
      run: (navigationInstruction, next) => {
        console.log("pre-act for" + navigationInstruction.config.moduleId);
        return next();
      }
    };
    config.addPreActivateStep(step);

    config.mapUnknownRoutes((instruction) => {
      return { route:"not-found", moduleId: PLATFORM.moduleName("./resources/elements/not-found.html") };
    });

    config.market = 'b';
    config.map([
      {route: ["", "home"], name: 'home', moduleId: PLATFORM.moduleName("./resources/elements/index"), title: "home", nav:true, settings: {icon: 'home'} },
      {route: "markets", name: 'markets', moduleId: PLATFORM.moduleName("./resources/elements/books"), title: "markets", nav:true },
      {route: "markets2", name: "markets2", moduleId: PLATFORM.moduleName("./resources/elements/markets"), title: "markets2", nav:true, settings: {icon: 'users'}},
      {route: "markets2/:Id/details", name:"market-detail", moduleId: PLATFORM.moduleName("./resources/elements/market-details"), title: "market details"},
      {
        route: ["mrkt"],
        name: "mrkt",
        navigationStrategy: this.customOne
      }
    ]);
  }

  customOne = (instruction) => {
    instruction.config.moduleId = `mrkt-${this.config.market}`;
  };

  bind(){
    console.log(this.router.navigation);
  }
}
