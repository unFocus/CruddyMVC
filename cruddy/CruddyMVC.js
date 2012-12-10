var Cruddy;
(function (Cruddy) {
    function sync(method, model, options) {
        switch(method) {
            case "create": {
                break;

            }
            case "update": {
                localStorage.setItem(model.id, JSON.stringify(model.properties));
                break;

            }
            case "read": {
                model.set(JSON.parse(localStorage.getItem(model.id)));
                break;

            }
            case "destroy": {
                localStorage.removeItem(model.id);
                break;

            }
        }
    }
    Cruddy.sync = sync;
    var Property = (function () {
        function Property(value, context) {
            this.value = value;
            this.context = context || this;
            this.changed = new Signal(this.context);
        }
        Property.prototype.set = function (value) {
            if(this.value === value) {
                return;
            }
            this.value = value;
            this.changed.trigger(this.value);
        };
        Property.prototype.get = function () {
            return this.value;
        };
        Property.prototype.toString = function () {
            return String(this.value);
        };
        return Property;
    })();
    Cruddy.Property = Property;    
    var Model = (function () {
        function Model(properties, options) {
            this.properties = properties;
            this.errored = new Signal(this);
            this.changed = new Signal(this);
            this.id = new Property(this);
            if(options) {
                if(options.validate) {
                    this.validate = options.validate;
                }
                if(options.sync) {
                    this.sync = options.sync;
                } else {
                    this.sync = sync;
                }
            }
            if(properties) {
                this.set(properties);
            }
        }
        Model.prototype.create = function (options) {
            this.sync("create", this, {
                success: function (data) {
                },
                error: function (msg) {
                }
            });
        };
        Model.prototype.read = function () {
        };
        Model.prototype.update = function () {
        };
        Model.prototype.destroy = function () {
        };
        Model.prototype.save = function () {
            if(!this.id) {
                this.create();
            } else {
                this.update();
            }
        };
        Model.prototype.get = function (property) {
            return this.properties[property];
        };
        Model.prototype.set = function (properties) {
            if(this.validate && typeof this.validate == "function") {
                var msg = this.validate(properties);
                if(msg) {
                    this.errored.trigger(this, msg);
                    return;
                }
            }
            for(var name in properties) {
                this.properties[name] = properties;
            }
            this.changed.trigger(this);
        };
        Model.prototype.unset = function (property) {
            delete this.properties[property];
            this.changed.trigger(this);
        };
        return Model;
    })();
    Cruddy.Model = Model;    
})(Cruddy || (Cruddy = {}));
//@ sourceMappingURL=CruddyMVC.js.map
