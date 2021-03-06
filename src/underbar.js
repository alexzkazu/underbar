/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined ) {
      return array[array.length-1];
    }
    if (n === 0 ) {
      return [];
    }
    if (n > array.length) {
      return array.slice(0,n);
    }
    // [1,2,3,4] -> 2, get 3,4
    else { 
      return array.slice(n-1);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if (collection instanceof Array) { // Why can't I use typeof collection === 'array'?
      for (var i=0; i < collection.length; i++){
        iterator(collection[i],i,collection);
      }
    } else {
      for (var i in collection) {
        iterator(collection[i],i,collection);
      }
    }
    
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var obj = [];
    // for (var i=0; i < collection.length; i++){
    //   if (test(collection[i])){
    //     obj.push(collection[i]);
    //   }
    // }

    _.each(collection,function(item){
      if(test(item)){
        obj.push(item);
      }
    });

    return obj;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection,function(item){
      return !test(item);
    });

    // var success = _.filter(collection,test); //get the array that passes.
    // var reject = [];
    // //compare the original with passing array, take the difference.

    // for (var i=0; i < collection.length; i++){
    //   for (var j=0; j < success.length; j++){
    //     if(collection[i] === success[j]){
    //       reject.push(i);
    //     }
    //   }
    // }
    
    // return reject;

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    // get an empty array
    // take each item of the array and check whether it exists in the array already
    // if the item doesn't exist, push into the empty array
    // return the array

    var arr = [];
      _.filter(array, function(item){
        if (arr.indexOf(item) === -1){
          arr.push(item);
        }
      });
    return arr; // difference between this and putting return on filter, and inside filter
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {

    // go through each item in the array
    // apply the iterator to each item
    // push the results into an array
    // return an array of results

  var arr = [];
    _.each(collection, function(item){
      arr.push(iterator(item));
    });
  return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their digest()
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (functionOrKey === "string"){ // it's a key
      return _.map(collection, function(value){
        return value[functionOrKey].apply(value,args);
      });
    } else {
      return _.map(collection, function(value){
        return functionOrKey.apply(value,args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator){

    // do a loop through the collection
    // the iterator does what it's supposed to do in the function
    // if the accumulator isn't passed in, accumulator is 0
    // the accumulator is supposed to save each result and run again as the previous number

    var total;

    if (accumulator === 'undefined'){
      total = collection[0];
    } else {
      total = accumulator;
    }

    _.each(collection, function(item){
      total = iterator(total, item);
    });

    return total;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {

    // var contains = false;

    // _.each(collection,function(num){
    //   if (num === target){
    //     contains = true;
    //   }
    // });

    // return contains;

    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) { // would be a false,
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {

    // var result = true;
    // _.each(collection, function(num){
    //   if (!iterator(collection[i])){
    //     result = false;
    //   }
    // });

    // return result;

    // take each item in the collection
    // determine whether each item passes the test
    // if it passes, return true

    iterator = iterator || _.identity; // 

    return _.reduce(collection, function(passed, item) { // true is passed in, grabs the next item
      if (passed && iterator(item)){ // if passed was true && test passes, the result is saved as passed
        return true;
      } else {
        return false;
      }
    }, true); // starts with true

    // TIP: Try re-using reduce() here.
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {

    // var result = false;
    // _.each(collection, function(num){

    //   if (iterator(collection[i])){
    //     result = true;
    //   }

    // });

    // return result;

    // return _.reduce(collection, function(passed,item){
    //   if (!passed && !iterator(item)){ // if ,
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }, false); // starts from false

    iterator = iterator || _.identity;


    // var result;
    // _.every(collection, function(item){ // every checks whether all the items pass the test
    //   if (item){
    //     result= true;
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    // return result;

    return !(_every(collection, function(v) {
        console.log(!truthStatementFunction(v));
        return !truthStatementFunction(v); // going to return the opposite of truth
    }));

    // TIP: There's a very clever way to re-use every() here.
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

    // // iterate through the keys in the unknown number of arguments
    // for (var i = 1; i < arguments.length; i++){ // arguments[0] is the first obj, so start from 1
      
    //   // iterate through each of the param/objs
      
    //   for (var a in arguments[i]){
    //     // add the keys/values contained within those objects into the first obj
    //     obj[a] = arguments[i][a];
    //   }
      
    // }
    
    var properties = Array.prototype.slice.call(arguments,1); // arguments is an array-like object 
    _.each(properties, function(item){ //iterate through the params in the function
      _.each(Object.keys(item), function(key){ //iterate through each of the keys 
        obj[key] = item[key]; //assign the values to the keys in object
      });
    });

    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    var properties = Array.prototype.slice.call(arguments,1); // arguments is an array-like object 
    _.each(properties, function(item){ //iterate through the params in the function
      _.each(Object.keys(item), function(key){ //iterate through each of the keys 
        obj[key] = key in obj ? obj[key] : item[key]; // if the key is in object, it stays as it is, if not, assign it
      });
    });

    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };



  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    // have a var that caches the result from the function
    var result = {};

    return function (argument) {

      // if arg key doesn't exist in result, run the function and save the value
      if (result[argument]){
        return result[argument];
      }

      result[argument] = func.apply(this,arguments);

      return result[arguments];
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    // grab the arguments after wait, so 2
    var args = Array.prototype.slice.call(arguments,2);

    setTimeout (function(){
      func.apply(this,args); 
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    var result = [];
    var copy = array.slice(); // make copy
    var length = copy.length; // keep original length

    // take a random number contained within the array, loop through the array until all are pushed
    for (var i=0; i< length; i++){
      //random number
      var random = Math.floor(copy.length*Math.random()); //takes current length of copy, and assigns a random key
      result.push(copy[random]); // push item into result
      copy.splice(random,1); // take out from the copy  
    }

    return result;
  
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
