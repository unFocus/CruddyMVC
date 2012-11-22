/// <reference path="../lib/SignalsLite.js/src/SignalLite.d.ts" />

module Cruddy
{
	"use strict";
	export function sync( method, model, options )
	{
		switch( method )
		{
			case "create":
				// generate a new id
			break;
			case "update":
				localStorage.setItem( model.id,
					JSON.stringify( model.properties )
				);
			break;
			
			case "read":
				model.set( JSON.parse(
					localStorage.getItem( model.id )
				) );
			break;
			
			case "destroy":
				localStorage.removeItem( model.id );
			break;
		}
	}
	export class Property
	{
		changed: Signal;

		context: Object;

		constructor( public value, context?: Object )
		{
			this.context = context || this;
			this.changed = new Signal( this.context );
		}

		set( value ) {
			this.value = value;
		}

		get() {
			return this.value;
		}

		toString() {
			return String( this.value );
		}
	}

	export class Model
	{
		errored: Signal;
		changed: Signal;

		// Bind Cruddy.sync as the default Sync handler.
		sync: Function;

		id: Property;
		validate: Function;

		constructor( public properties?, options? )
		{
			this.errored = new Signal( this );
			this.changed = new Signal( this );

			this.id = new Property( this );

			if ( options.validate )
				this.validate = options.validate;

			if ( options.sync )
				this.sync = options.sync;
			else
				this.sync = sync;

			if ( properties )
				this.set( properties );
		}

		create( options? )
		{
			this.sync( "create", this, {
				success: function( data ) {
					
				},
				error: function( msg ) {
					
				}
			} );
		}
		
		read() {
			
		}
		
		update() {
			
		}
		
		destroy() {
			
		}
		
		save()
		{
			if ( !this.id )
				this.create();
			else
				this.update();
		}
		
		get( property ) {
			return this.properties[ property ];
		}
		
		set( properties )
		{
			if ( this.validate && typeof this.validate == "function" )
			{
				var msg = this.validate( properties );
				if ( msg ) {
					this.errored.trigger( this, msg );
					return;
				}
			}
			
			for ( var name in properties )
				this.properties[ name ] = properties;
			
			this.changed.trigger( this );
		}
		
		unset( property )
		{
			delete this.properties[ property ];
			this.changed.trigger( this );
		}
		
	}
}
