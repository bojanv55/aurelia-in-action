export class App {
  configureRouter(config, router){
    this.router = router;
    config.title = 'Markets';
    config.map([
      {route: ["", "home"], name: 'home', moduleId: PLATFORM.moduleName("./resources/elements/index")},
      {route: "markets", name: 'markets', moduleId: PLATFORM.moduleName("./resources/elements/books")}
    ]);
  }
}
