'use strict';

function Scope(){
	this.watchersArr = [];
	this.queue = [];
	this.phase = null;
	this.postDigestQueue = [];
};


Scope.prototype.watch = function(watchFn, listenerFn, valueEq) {
	var that = this;
	var watcher = {
		watchFn: watchFn,
		listenerFn: listenerFn || function(){},
		valueEq: !!valueEq 
	};
	that.watchersArr.push(watcher);
	return function() {
		var current = that.watchersArr.indexOf(watcher);
		if(current >= 0){
			that.watchersArr.splice(current, 1);
		}
	}
};

Scope.prototype.digestOnce = function() {
	var that = this,
	dirtyData;
	_.forEach(that.watchersArr, function(watch){
		try{
			let newVal = watch.watchFn(that),
			oldVal = watch.last;
			if(!that.equal(newVal, oldVal, watch.valueEq)){
				watch.listenerFn(newVal, oldVal, that);
				dirtyData = true;
			}
			if(watch.valueEq){
				watch.last = _.cloneDeep(newVal);
			}
			else{
				watch.last = newVal;
			}
		}
		catch(e){
			console.log("task failed");
		}
	});
	return dirtyData;
};


Scope.prototype.digest = function() {
	var dirtyData,
	ttl = 10;
	this.phaseStart('digest');
	do{
		while (this.queue.length) {
			try{
				let task = this.queue.shift();
				this.eval(task.expression);
			}
			catch(e){
				console.log("task failed");
			}
		}
		dirtyData = this.digestOnce();
		ttl--;
		if(dirtyData && (ttl<0))
		{
			this.phaseClear();
			throw "This is infinity loop";
		}
	}
	while (dirtyData);
	this.phaseClear();

	while (this.postDigestQueue.length) {
		try{
			this.postDigestQueue.shift()();
		}
		catch(e){
			console.log("task failed");
		}
	}
};

Scope.prototype.equal = function(newVal, oldVal, valueEq) {
	if(valueEq){
		return _.isEqual(newVal, oldVal);
	}
	else{
		return newVal === oldVal || (typeof newVal === 'number' && typeof oldVal === 'number' &&
			isNaN(newVal) && isNaN(oldVal));;
	}
};

Scope.prototype.apply = function(expr) {
	try{
		this.phaseStart('apply');
		return this.eval(expr);
	}
	finally{
		this.phaseClear();
		this.digest();
	}
};

Scope.prototype.eval = function(expr, someParams) {
	return expr(this, someParams);
};

Scope.prototype.async = function(expr) {
	var that = this;
	if(!that.phase && !that.queue.length){
		setTimeout(
			function(){
				if(that.queue.length){
					that.digest();
				}
			}, 0);
	}
	this.queue.push({
		scope: this, 
		expression: expr
	});
};

Scope.prototype.phaseStart = function(phase) {
	if(this.phase){
		throw this.phase + ' in progress';
	}
	else{
		this.phase = phase;
	}
};

Scope.prototype.phaseClear = function(phase) {
	this.phase = null;
};

Scope.prototype.postDigest = function(func) {
	this.postDigestQueue.push(func);
};