function _(elm){
    if(!new.target) return new _();
    let selector = document.querySelectorAll(elm);
    this.el = selector[0];
}