$(document).ready(function() {

  var localDataStore = {

     loadID: "",
     loadNameSpace: "",
     loadData: [ {actionButton1: ""},
                 {actionButton2: ""},
                 {beginingEmpty: ""},
                 {beginingLoaded: ""},
                 {brokerLoadID: ""},
                 {brokerName: ""},
                 {brokerPhone: ""},
                 {emptyActual: ""},
                 {emptyPaid: ""},
                 {emptyVariance: ""},
                 {endingEmpty: ""},
                 {endingLoaded: ""},
                 {loadActionFlag: ""},
                 {loadDeliveryDate: new LoadDate},
                 {loadedActual: ""},
                 {loadedPaid: ""},
                 {loadedVariance: ""},
                 {loadNumber: ""},
                 {loadStartDate: new LoadDate},
                 {loadTemp: ""},
                 {reeferPretripped: ""},
                 {sealMatches: ""},
                 {tempMatches: ""},
                 {totalActual: ""},
                 {totalEmptyMiles: ""},
                 {totalLoadedMiles: ""},
                 {totalMiles: ""},
                 {totalPaid: ""},
                 {totalVariance: ""},
               ],

      initStorage: function(ld) {
          console.log("enter localDataStore.initStorage:");
          if( ld ) {
              console.log("   storage initialization request for load: "+ld);
              if( this.loadID !== ld ) {    //  current load not same as load specified
                  console.log("   old load: "+this.loadID);
                  if( this.loadID === "" ) {    //  app initialize
                    this.loadNameSpace = "testLoad_"+ld;   //  generate nameSpace for local storage
                    console.log("   new loadNameSpace: "+this.loadNameSpace);
                    if( this.retrieve(this.loadNameSpace ) ) {   // get existing load?
                      console.log("   storage read");      // specified load exists 
                      populateDisplay(this.loadData);      // load existing data onto display
                    } else {
                      console.log("   storage NOT read");  // brand new load so save space
                      this.loadID = ld;
                      this.loadData.loadNumber = ld;                    //  save ID
                      this.save();
                    } 
                  } else {
                    this.save();
                    this.loadID = ld;
                    this.loadData.loadNumber = ld;
                    this.loadNameSpace = "testLoad_"+ld;
                    if( this.retrieve(this.loadNameSpace ) ) {   // get existing load?
                      console.log("   storage read");      // specified load exists 
                      populateDisplay(this.loadData);      // load existing data onto display
                    } else {
                      console.log("   storage NOT read");  // brand new load so save space
                      this.loadID = ld;                    //  save ID
                      this.loadData.loadNumber = ld;
                      this.save();
                    }
                  }
                  return true;   
              } else {}
              console.log("   storage namespace is: "+this.loadNameSpace);
              if( this.retrieve(this.loadNameSpace) ) {
                  console.log("   storage read");
              } else {
                  console.log("   storage NOT read");
              }
          } else {
            console.log("   ld not specified - storage not initialized");
          }
      },

      save: function () {
          console.log("enter LocalDataStorage.saveLocal:");
          var memStorageAsString = JSON.stringify(this.loadData);
          console.log("   memStorageAsString: "+memStorageAsString);
          localStorage.setItem(this.loadNameSpace, memStorageAsString);
      },

      retrieve: function() {
          console.log("enter LocalDataStorage.retrieveLocal:");
          var memStorageAsString = "";
          if( (memStorageAsString = localStorage.getItem(this.loadNameSpace)) ) {
            console.log("   memStorageAsString: "+memStorageAsString);
            return this.loadData = JSON.parse(memStorageAsString) || [];
          } else {
            return false;
          }
      },

      saveLoadItem: function(item, info) {
          console.log("Enter localDataStore.saveLoadItem: save- "+info+" in "+item);
          if( item=="loadDeliveryDate" || item=="loadStartDate" ) {
            this.loadData[item] = this.fromString(info);
          } else {
            this.loadData[item] = info;
          }
//          this.save();
      },

      getLoadItem: function(item) {
        var data = "";
        if( item=="loadDeliveryDate" || item=="loadStartDate" ) {
          data = this.loadData[item].toString(this.loadData.year, this.loadData.month, this.loadData.day);
        } else {
          data = this.loadData[item];
        }
          return data;  
      },
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

  function populateDisplay(loadInfo) {
    console.log("enter populateDisplay");
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
  $("#ldNumber").on("blur", function() {
       var ld = this.value;
       console.log("Enter #ldNumber.blur: ld= "+ld);
       if( !validateLoadNumber(ld) ) {
          alert("Entered load number ("+ld+") is in error. The Load Number is required and must be composed of seven (7) numeric digits.");
          this.value("");
          cancelEvent(window.event);
          return;
        }
       if( !localDataStore ) {
         console.log("   NO localDataStore!");
       } else {
         localDataStore
         if( ld ) {
           localDataStore.initStorage(ld);
         } else {
           console.log("      localDataStore exists but ld does not exist!");
         }   
       }
      
  });
/*
  $("#loadAction").on("", function(){});
  $("#loadStartDate").on("", function(){});
  $("#submitButton1").on("", function(){});
*/
  $("#submitButton2").on("click", function(){
    console.log("Enter submitButton2" );
    localDataStore.save();
    $("#submitButton2").text("Save Load Assignment");
  });
/*
  $("#selectDayOpts").on("", function(){});
*/
  $("#brokerName").on("blur", function(){
    var brokerData = this.value;
    console.log(" Enter #brokerName: "+brokerData);
    localDataStore.saveLoadItem("brokerName", brokerData);
  });
  $("#brokerLoadID").on("blur", function(){
    var brokerData = this.value;
    console.log(" Enter #brokerLoadID: "+brokerData);
    localDataStore.loadData["brokerLoadID"]= brokerData;
  });
  $("#brokerPhone").on("blur", function(){
    var brokerData = this.value;
    console.log(" Enter #brokerPhone: "+brokerData);
    localDataStore.loadData.brokerPhone = brokerData;
  });
/*
  $("#LoadTemp").on("", function(){});
  $("#preTripped").on("", function(){});
  $("#tempMatches").on("", function(){});
  $("#sealMatches").on("", function(){});
  $("#eP").on("", function(){});
  $("#emptyActual").on("", function(){});
  $("#emptyVariance").on("", function(){});
  $("#lP").on("", function(){});
  $("#loadedActual").on("", function(){});
  $("#loadedVariance").on("", function(){});
  $("#totalPaid").on("", function(){});
  $("#totalActual").on("", function(){});
  $("#totalVariance").on("", function(){});
  $("#eOdoE").on("", function(){});
  $("#eOdoL").on("", function(){});
  $("#bOdoE").on("", function(){});
  $("#beginingLoaded").on("", function(){});
  $("#totalEmptyMiles").on("", function(){});
  $("#totalLoadedMiles").on("", function(){});
  $("#totalMiles").on("", function(){});
  $("#cright").on("", function(){});
*/


});