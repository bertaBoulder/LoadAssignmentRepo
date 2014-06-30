$(document).ready(function() {

  var LocalDataStore = {
             loadID: "",
             loadNameSpace: "",
             actionButton1: "",
             actionButton2: "",
             beginingEmpty: "",
             beginingLoaded: "",
             brokerLoadID: "",
             brokerName: "",
             brokerPhone: "",
             emptyActual: "",
             emptyPaid: "",
             emptyVariance: "",
             endingEmpty: "",
             endingLoaded: "",
             loadActionFlag: "",
             loadDeliveryDate: new LoadDate,
             loadedActual: "",
             loadedPaid: "",
             loadedVariance: "",
             loadStartDate: new LoadDate,
             loadTemp: "",
             reeferPretripped: "",
             sealMatches: "",
             tempMatches: "",
             totalActual: "",
             totalEmptyMiles: "",
             totalLoadedMiles: "",
             totalMiles: "",
             totalPaid: "",
             totalVariance: "",
    
      makeNewStorage: function(ld) {
          console.log("enter LocalDataStore.makeNewStorage:");
          this.loadID = ld;
          this.loadNameSpace = "testLoad_"+ld;
          if ( !this.retrieve() ) {
            this.save;
          } else {
            console.log("   load "+ld+" retrieved")
          }
          return;
      },

      initStorage: function(ld) {
          console.log("enter LocalDataStore.initStorage:");
          if( ld ) {
              console.log("   storage initialization request for load: "+ld);
              if( this.loadID !== ld ) {    //  current load not same as load specified
                  console.log("   old load: "+this.loadID);
                  if( this.loadID === "" ) {    //  app initialize
                    this.makeNewStorage(ld);
                    populateDisplay(LocalDataStore);
                    return;
                  } else {
                    this.save();
                    this.makeNewStorage(ld);
                    populateDisplay(LocalDataStore);
                  }
              } else {
                  this.save();
              }
          }
      },

      save: function () {
          console.log("enter LocalDataStorage.saveLocal:");
          var memStorageAsString = JSON.stringify(this);
          console.log("   memStorageAsString: "+memStorageAsString);
          localStorage.setItem(this.loadNameSpace, memStorageAsString);
      },

      retrieve: function() {
          var tmpData = [];
          var item;
          console.log("enter LocalDataStorage.retrieveLocal:");
          var memStorageAsString = "";
          if( (memStorageAsString = localStorage.getItem(this.loadNameSpace)) ) {
            console.log("   memStorageAsString: "+memStorageAsString);
            tmpData = JSON.parse(memStorageAsString) || [];
            for (item in tmpData) {
              console.log("   assigning "+tmpData[item]+" to "+item);
              if( item == "loadDeliveryDate" || item == "loadStartDate" ) {
                console.log("   data: "+item+"= "+tmpData[item]);
              } else {
                this[item] = tmpData[item];
              }
              console.log("   saved "+this[item]);
            };
            return true;
          } else {
            return false;
          }
      },

      saveLoadItem: function(item, info) {
          console.log("Enter LocalDataStore.saveLoadItem: save- "+info+" in "+item);
          if( item=="loadDeliveryDate" || item=="loadStartDate" ) {
            this[item] = this.fromString(info);
          } else {
            this[item] = info;
          }
          console.log("   saved this.loadData[item] = "+this[item]);
//          this.save();
      },

      getLoadItem: function(item) {
        var data = "";
        console.log("Enter LocalDataStore.getLoadItem: retrieve item: "+item);
        if( item=="loadDeliveryDate" || item=="loadStartDate" ) {
          data = this[item].toString(this[item].year, this[item].month, this[item].day);
        } else {
          data = this[item];
        }
        console.log("exit getLoadItem");
        return data;  
      },
  };

  function populateDisplay(loadInfo) {
    var item;
    var data;
    console.log("enter populateDisplay");
    for (item in loadInfo) {
//      console.log("   checking: "+item+" class="+Object.prototype.toString.call(loadInfo[item]));
      if( Object.prototype.toString.call(loadInfo[item]) == "[object Object]") {
        if( item === "loadDeliveryDate" ) {
          console.log("   checking loadDeliveryDate: "+item+" "+loadInfo[item].year);
        } else if( item === "loadStartDate" ) {
          console.log("   checking loadStartDate: "+item+" "+loadInfo[item].year);
        }
      } else if( Object.prototype.toString.call(loadInfo[item]) == "[object String]") {
        if( loadInfo[item].length > 0 ) {
          console.log("   populate: "+item+" with "+loadInfo[item]);
        }
      }
//      else {
//        console.log("   ignoring: "+Object.prototype.toString.call(loadInfo[item])+" "+item);
//      } 
    }
    console.log("exit populateDisplay");
  };

  function LoadDate(yy, mm, dd) {
    this.year = yy?yy:new Date().getFullYear();
    this.month = mm?mm:new Date().getMonth() + 1;
    this.day = dd?dd:new Date().getDate();
    console.log("LoadDate.constructor: yyyy "+this.year+" mm "+this.month+" dd "+this.day);
  };

  LoadDate.prototype = {
    constructor: LoadDate,

    toString: function(yy, mm, dd) {
      var someYear = yy?yy:this.year;
      var someMonth = mm?mm:this.month;
      var someDay = dd?dd:this.day;
      console.log("enter LoadDate.toString: "+someMonth+"/"+someDay+"/"+someYear)
      return someMonth+"/"+someDay+"/"+someYear;
    },

    fromString: function(someDate) {
      var dateArray = someDate?someDate.split("/"):[];
      var aDate = [];
      if( dateArray ) {
        aDate.push({day: "dateArray[1]"});
        aDate.push({month: "dateArray[0]"});
        aDate.push({year: "dateArray[2]"});
      } else {
        aDate.push({day: ""});
        aDate.push({month: ""});
        aDate.push({year: ""});
      }
      console.log("Exit LoadDate.fromString = "+aDate);
      return aDate;
    },
  }; 

  function initDeliveryDates(yy, mm, dd) {
    console.log("enter LoadDate.initDeliveryDates: yy: "+yy?yy:this.year+" mm: "+mm?mm:this.month+" dd: "+dd?dd:this.day);
    var startYear = yy?yy:this.year;
    var startMonth = mm?mm:this.month;
    var startDay = dd?dd:this.day;
    var days=['01','02','03','04','05','06','07','08','09','10','11','12','13','14',
              '15','16','17','18','19','20','21','22','23','24','25','26','27','28',
              '29','30','31'];
    var daysInMonth=[31,0,31,30,31,30,31,31,30,31,30,31];
    var selectDayFlds = $("#selectDayOpts").options;
    var dayIdx = todaysDay - 1;
    var mnthIdx = todaysMonth - 1;
    daysInMonth[1]=(((startYear%100!==0)&&(startYear%4===0))||(startYear%400===0))?29:28;
    for (var i = 0; i < selectDayFlds.length; i++ ) {
      optDate = days[mnthIdx] + "/" + days[dayIdx] + "/" + startYear;
      selectDayFlds[i].innerHTML = optDate;
      selectDayFlds[i].value = optDate;
      dayIdx++;
      if ( dayIdx+1 > daysInMonth[mnthIdx] ) {
        dayIdx = 0;
        mnthIdx++;
        if ( mnthIdx+1 > 11 ) {
          mnthIdx = 0;
          startYear++;
        }
      }
    }
  };

  function cancelEvent(evnt) {
    if (evnt.preventDefault) {
      evnt.preventDefault();
      evnt.stopPropagation();
    } else {
      evnt.returnValue = false;
      evnt.cancelBubble = true;
    }
  };

  function validateLoadNumber(ld) {
      var loadNumberPattern = /^[0-9]*$/g;
      if ( loadNumberPattern.test(ld) && ld.length == 7 ) {
          return true;
      } else {
          return false;
      }    
    };
/*
  $("#mainTable").on("", function(){});
  $("#pageTitle").on("", function(){});
  $("#shipperPage").on("", function(){});
  $("#consigneePage").on("", function(){});
  $("#pickPage").on("", function(){});
  $("#dropPage").on("", function(){});
  $("#fuelPage").on("", function(){});
*/
  $("#loadID").on("blur", function() {
       var ld = $("#loadID").val();
       console.log("Enter #ldNumber.blur: ld= "+ld);
       if( !validateLoadNumber(ld) ) {
          alert("Entered load number ("+ld+") is in error. The Load Number is required and must be composed of seven (7) numeric digits.");
//          this.value("");
          cancelEvent(window.event);
          return;
        }
        LocalDataStore.initStorage(ld); 
  });
/*
  $("#loadAction").on("", function(){});
  $("#loadStartDate").on("", function(){});
*/
  $("#submitButton1").on("click", function(){
    console.log("Enter submitButton1" );
  });

  $("#submitButton2").on("click", function(){
    console.log("Enter submitButton2" );
    LocalDataStore.save();
    $("#submitButton2").text("Save Load Assignment");
    console.log("   a stopping point");
  });
/*
  $("#selectDayOpts").on("", function(){});
*/
  $("#brokerName").on("change", function(){
    var brokerData = $("#brokerName").val();
    console.log(" Enter #brokerName: "+brokerData);
    LocalDataStore.saveLoadItem("brokerName", brokerData);
  });
  $("#brokerLoadID").on("change", function(){
    var brokerData = $("#brokerLoadID").val();
    console.log(" Enter #brokerLoadID: "+brokerData);
    LocalDataStore.saveLoadItem("brokerLoadID", brokerData);
//    LocalDataStore.loadData["brokerLoadID"]= brokerData;
  });
  $("#brokerPhone").on("change", function(){
    var brokerData = $("#brokerPhone").val();
    console.log(" Enter #brokerPhone: "+brokerData);
    LocalDataStore.saveLoadItem("brokerPhone", brokerData);
//    LocalDataStore.loadData.brokerPhone = brokerData;
  });
  $("#LoadTemp").on("change", function(){
    var loadData = $("#LoadTemp").val();
    console.log(" Enter #LoadTemp: "+loadData);
    LocalDataStore.saveLoadItem("loadTemp", loadData);
  });
  $("#preTripped").on("change", function(){
    var loadData = $("#preTripped").val();
    console.log(" Enter #preTripped: "+loadData);
    LocalDataStore.saveLoadItem("reeferPretripped", loadData);
  });
  $("#tempMatches").on("change", function(){
    var loadData = $("#tempMatches").val();
    console.log(" Enter #tempMatches: "+loadData);
    LocalDataStore.saveLoadItem("tempMatches", loadData);
  });
  $("#sealMatches").on("change", function(){
    var loadData = $("#sealMatches").val();
    console.log(" Enter #sealMatches: "+loadData);
    LocalDataStore.saveLoadItem("sealMatches", loadData);
  });
  $("#eP").on("change", function(){
    var loadData = $("#eP").val();
    console.log(" Enter #eP (emptyPaid): "+loadData);
    LocalDataStore.saveLoadItem("emptyPaid", loadData);
  });
  $("#lP").on("change", function(){
    var loadData = $("#lP").val();
    console.log(" Enter #lP (loadedPaid): "+loadData);
    LocalDataStore.saveLoadItem("loadedPaid", loadData);
  });
/*
  $("#emptyActual").on("", function(){});
  $("#emptyVariance").on("", function(){});
  $("#loadedActual").on("", function(){});
  $("#loadedVariance").on("", function(){});
  $("#totalPaid").on("", function(){});
  $("#totalActual").on("", function(){});
  $("#totalVariance").on("", function(){});
*/
  $("#eOdoE").on("change", function(){
    var loadData = $("#eOdoE").val();
    console.log(" Enter #eOdoE (endingOdoEmpty): "+loadData);
    LocalDataStore.saveLoadItem("endingEmpty", loadData);
  });
  $("#eOdoL").on("change", function(){
    var loadData = $("#eOdoL").val();
    console.log(" Enter#eOdoL (endingOdoLoaded): "+loadData);
    LocalDataStore.saveLoadItem("endingLoaded", loadData);
  });
  $("#bOdoE").on("change", function(){
    var loadData = $("#bOdoE").val();
    console.log(" Enter #bOdoE (beginningOdoEmpty): "+loadData);
    LocalDataStore.saveLoadItem("beginingEmpty", loadData);
  });
/*
  $("#beginingLoaded").on("", function(){});
  $("#totalEmptyMiles").on("", function(){});
  $("#totalLoadedMiles").on("", function(){});
  $("#totalMiles").on("", function(){});
*/


});