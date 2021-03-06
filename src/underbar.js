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
    var last = array.length-1;
    var sliceFrom = last-n+1;
    if (sliceFrom < 0){
      sliceFrom = 0
    };
    return n === undefined ? array[last] : array.slice(sliceFrom);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if (collection instanceof Array){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i],i,collection);
      };    
    }
    else {
      for(var item in collection){
        iterator(collection[item],item, collection);
      };
    };
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
    var result = [];
    _.each(collection, function(item, index){
      if(test(item)){
        result.push(item);
      }
    })
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var falseTest = function(a){
      return !test(a);
    };
    return _.filter(collection, falseTest);
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    var copy = array.slice();
    while (copy.length > 0){
      var element = copy.splice(0,1)[0];
      result.push(element);
      for (var j = 0; j < copy.length; j++){
        if(element === copy[j]){
          copy.splice(j,1);
          j--;
        }
      }
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(value, key, collection){
      var element = iterator(value, key, collection);
      results.push(element);
    })
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
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
    return _.map(collection, function(item){
      var fun = item[functionOrKey];
      if (functionOrKey instanceof Function){
        fun = functionOrKey;
      };
      return fun.apply(item, args);
    })
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
  _.reduce = function(collection, iterator, accumulator) {
    var accumulator = accumulator === undefined ? collection[0] : accumulator;
    _.each(collection, function(value){
      accumulator = iterator(accumulator, value);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(isTrue, item){
      if(!isTrue){
        return false;
      }
      return iterator === undefined ? Boolean(item) : Boolean(iterator(item));
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return !_.every(collection, function(item){
      return iterator === undefined ? !Boolean(item) : !iterator(item);
    })
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
    var baseObj = arguments[0];
    for (var i = 1; i< arguments.length; i++){
      _.each(arguments[i], function(value, key){
        baseObj[key] = value;
      })
    }
    return baseObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var baseObj = arguments[0];
    for (var i = 1; i< arguments.length; i++){
      _.each(arguments[i], function(value, key){
        if(!(key in baseObj))
        {
          baseObj[key] = value;
        };
      })
    }
    return baseObj;
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
    var result = {};
    var arg = func.arguments;
    return function(arg) {
      if (!(arg in result)) {
        result[arg] = func.apply(this, arguments);
      }
      return result[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2);
    var delayedFunc = function(){
        return func.apply(this,args);
    };
    setTimeout(delayedFunc,wait);
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
    var copy = array.slice();
    var result = [];
    while(copy.length > 0){
      var random = Math.floor(Math.random()*copy.length);
      var element = copy.splice(random,1)[0];
      result.push(element);
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
    return collection.sort(function(a,b){
      var aProp;
      var bProp;
      if(typeof iterator == 'string'){
        aProp = a[iterator];
        bProp = b[iterator];
      }
      else {
        aProp = iterator(a);
        bProp = iterator(b);
      }
      if (aProp < bProp) {
        return -1;
      }
      if (aProp > bProp) {
        return 1;
      }
      return 0;
    })
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var length = _.reduce(arguments, function(len, arg){
      return len > arg.length ? len : arg.length;
    },0) 
    return _.reduce(arguments, function(result, arg){
      for(var i = 0; i < length; i++){
        if(result[i] === undefined){
          result[i] = [arg[i]];
        } 
        else{ 
          result[i].push(arg[i]);
        };
      }
      return result;
    }, result)
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];
    var insert = function(element){
      if(!Array.isArray(element)){
        result.push(element);
      }
      else{
        return _.each(element, function(item){
          return insert(item);
        })
      }
    }

    insert(nestedArray);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    //find the array with the least number of elements using reduce
    var minArray = arguments[0];
    var args = arguments
    var inAllArray = function(element){
      return _.every(args, function(arg){
        return _.contains(arg, element);
      })
    };

    minArray = _.reduce(arguments, function(minArray, arg){
      return minArray > arg.length ? arg : minArray;
    }, minArray)
    //for every element of the array, add to result if every argument contains that element
    return _.reduce(minArray, function(result,element){
      if(inAllArray(element)){
        result.push(element);
      }
      return result;
    },[])
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var firstArray = arguments[0];
    var args = Array.prototype.slice.call(arguments,1);
    var inOther = function(element){
      return _.some(args, function(arg){
        return _.contains(arg, element);
      })
    };
    return _.reduce(firstArray, function(result,element){
      if(!inOther(element)){
        result.push(element);
      }
      return result;
    },[])
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //I hate this is so hard!!!
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var waiting = false;
    var waitlist = 0;
    var result;
    var resultFunc = function(){
                  if(!waiting)
                  { waiting = true;
                    setTimeout(waitReset, wait);
                    result = func.apply(this, arguments);
                    return result;
                  }
                  {
                    waitlist++;
                    console.log("counter is now at" + waitlist);
                    return result;
                  }
                };

    var waitReset = function(){
      console.log(waiting);
      waiting = false;
      if (waitlist > 0){
        console.log("this ran");
        waitlist--;
        return resultFunc.apply(this,arguments);
      }
    }

    return resultFunc;
  };

}).call(this);
