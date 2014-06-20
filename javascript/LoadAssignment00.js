$(document).ready(function() {

  var localDataStore = new LocalDataStorage();

   function LocalDataStorage() {
      this.loadID = "";
      this.loadNameSpace = "";
      this.loadData = [ {actionButton1: ""},
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
                      ];

      console.log("Exit LocalDataStorage.constructor: "+JSON.stringify(this.loadData));
   };

   LocalDataStorage.prototype = {
      constructor: LocalDataStorage,
      initStorage: function(ld) {
          console.log("enter LocalDataStorage.initStorage:");
          if( ld ) {
            console.log("   new loadID is: "+ld);
            if( this.loadID !== ld ) {
              console.log("   old load: "+this.loadID);
              this.save();
              this.loadID        = ld;               //  save ID
              this.loadNameSpace = "testLoad_"+ld;   //  generate nameSpace for local storage
              console.log("   new loadNameSpace: "+this.loadNameSpace);
            }
            console.log("   storage namespace is: "+this.loadNameSpace);
            if( this.retrieve(this.loadNameSpace) ) {
              console.log("   storage read");
            } else {
              console.log("   storage NOT read");
            }
          } else {
            console.log("   ld not set");
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
          if( item=="loadDeliveryDate" || item=="loadStartDate" ) {
            this.loadData[item] = this.fromString(info);
          } else {
            this.loadData[item] = info;
          }
          save();
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
  }

  LoadDate.prototype = {
    constructor: LoadDate,

    initDeliveryDates: function(yy, mm, dd) {
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
    },

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

/*  localDataStore.init();    */
/*  initDeliveryDates();      */
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
       if( !localDataStore ) {
         console.log("   NO localDataStore!");
       } else {
         console.log("   localDataStore exists");
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
  $("#selectDayOpts").on("", function(){});
  $("#brokerName").on("", function(){});
  $("#brokerLoadID").on("", function(){});
  $("#brokerPhone").on("", function(){});
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
  $("#submitButton2").on("", function(){});
  $("#cright").on("", function(){});
*/


});