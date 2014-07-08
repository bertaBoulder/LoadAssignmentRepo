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
             preTripped: false,
             sealMatches: false,
             tempMatches: false,
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
            console.log("   load "+ld+" retrieved");
            newDeliveryDates(this.loadStartDate.year, this.loadStartDate.month, this.loadStartDate.day);
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
                  } else {    // need to save, clear then create and display
                    this.save();
                    this.clear();
                    this.makeNewStorage(ld);
                    populateDisplay(LocalDataStore);
                  }
              } else {
                  this.save();
              }
          }
      },

      clear: function () {
        console.log("enter LocalDataStorage.clear:");
        this.actionButton1 = " ";
        this.actionButton2 = " ";
        this.beginingEmpty = " ";
        this.beginingLoaded = " ";
        this.brokerLoadID = " ";
        this.brokerName = " ";
        this.brokerPhone = " ";
        this.emptyActual = " ";
        this.emptyPaid = " ";
        this.emptyVariance = " ";
        this.endingEmpty = " ";
        this.endingLoaded = " ";
        this.loadActionFlag = " ";
        this.loadDeliveryDate = new LoadDate;
        this.loadedActual = " ";
        this.loadedPaid = " ";
        this.loadedVariance = " ";
        this.loadStartDate = new LoadDate;
        this.loadTemp = " ";
        this.preTripped = false;
        this.sealMatches = false;
        this.tempMatches = false;
        this.totalActual = " ";
        this.totalEmptyMiles = " ";
        this.totalLoadedMiles = " ";
        this.totalMiles = " ";
        this.totalPaid = " ";
        this.totalVariance = " ";
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
                this[item] = new LoadDate( tmpData[item].year, tmpData[item].month, tmpData[item].day );
                console.log("   data: "+item+" = "+tmpData[item]);
              } else {
                this[item] = tmpData[item];
              }
//             console.log("   saved "+this[item]);
            };
            return true;
          } else {
            return false;
          }
      },

      saveLoadItem: function(item, info) {
          console.log("Enter LocalDataStore.saveLoadItem: save- "+info+" in "+item);
          if( item=="loadDeliveryDate" || item=="loadStartDate" ) {
            var dateArray = info.split("/");
            this[item] = new LoadDate( dateArray[2], dateArray[0], dateArray[1] );
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
    var data = "";
    console.log("enter populateDisplay");
    for (item in loadInfo) {
      if( Object.prototype.toString.call(loadInfo[item]) == "[object Object]") {
        if( item === "loadDeliveryDate" ) {
          console.log("   checking loadDeliveryDate: "+item+" "+loadInfo[item].year+" / "+loadInfo[item].month+" / "+loadInfo[item].day);
          data = loadInfo[item].month+"/"+loadInfo[item].day+"/"+loadInfo[item].year;
          console.log("   date: "+data);
          $("#selectDayOpts").val(data);
        } else if( item === "loadStartDate" ) {
          console.log("   ignoring loadStartDate: "+item+" "+loadInfo[item].year+" / "+loadInfo[item].month+" / "+loadInfo[item].day);
        }
      } else if( Object.prototype.toString.call(loadInfo[item]) == "[object String]") {
        if( loadInfo[item].length > 0 ) {
          if( item != "loadNameSpace" ) {
            console.log("   populate: "+item+" with "+loadInfo[item]);
            if ( item == "beginingEmpty" ) {
              $("#bOdoE").val( parseInt(loadInfo[item]) );
            } else if ( item == "endingEmpty" ) {
              $("#eOdoE").val( parseInt(loadInfo[item]) );
            } else if ( item == "endingLoaded" ) {
              $("#eOdoL").val( parseInt(loadInfo[item]) );
            } else if ( item == "emptyPaid" ) {
              $("#eP").val( parseInt(loadInfo[item]) );
            } else if ( item == "loadedPaid" ) {
              $("#lP").val( parseInt(loadInfo[item]) );
            } else if ( item == "emptyPaid" ||
                        item == "beginingLoaded" ||
                        item == "emptyActual" ||
                        item == "loadedActual" ||
                        item == "totalActual" ||
                        item == "totalEmptyMiles" ||
                        item == "totalLoadedMiles" ||
                        item == "totalMiles" ||
                        item == "totalPaid" ) {
                data = parseInt(loadInfo[item])?parseInt(loadInfo[item]):"";
                $("#"+item).val( data );
            } else if ( item == "emptyVariance" ||
                        item == "loadedVariance" ||
                        item == "totalVariance" ) {
                data = parseFloat(loadInfo[item])?parseFloat(loadInfo[item]).toFixed(2):"";
                $("#"+item).val( data );
            } else if ( item == "loadTemp" ) {
                $("#LoadTemp").val(loadInfo[item]);
            } else {
                $("#"+item).val(loadInfo[item]);
            }
          }
        }
      } else if( Object.prototype.toString.call(loadInfo[item]) == "[object Boolean]") {
        if ( item == "preTripped" ||
             item == "sealMatches" ||
             item == "tempMatches"  ) {
          $("#"+item).prop("checked",loadInfo[item]);
        }
      }
      else {
        console.log("   ignoring: "+Object.prototype.toString.call(loadInfo[item])+" "+item);
      } 
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
      var dateString = "";
      console.log("enter LoadDate.toString: "+someMonth+"/"+someDay+"/"+someYear);
      dateString = someMonth+"/"+someDay+"/"+someYear;
//      return someMonth+"/"+someDay+"/"+someYear;
      return dateString;
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

  function newDeliveryDates(yy, mm, dd) {
    console.log("enter LoadDate.initDeliveryDates: ");
    var today = new Date;
    var startYear = yy?yy:today.getFullYear();
    var startMonth = mm?mm:today.getMonth()+1;
    var startDay = dd?dd:today.getDate();
    var days=['01','02','03','04','05','06','07','08','09','10','11','12','13','14',
              '15','16','17','18','19','20','21','22','23','24','25','26','27','28',
              '29','30','31'];
    var daysInMonth=[31,0,31,30,31,30,31,31,30,31,30,31];
//    var selectDayFlds = $("#selectDayOpts").options;
    var selectDayFlds = document.getElementById("selectDayOpts").options;
    var dayIdx = startDay - 1;
    var mnthIdx = startMonth - 1;
    today = 1;
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

  function calculatePaid() {
    console.log("enter calculatePaid: ");
    if( parseInt( $("#eP").val()) && parseInt($("#lP").val()) ) {
        $("#totalPaid").val(parseInt($("#eP").val()) + parseInt($("#lP").val()));
        LocalDataStore.saveLoadItem("totalPaid", $("#totalPaid").val());
    }
  };

  function calculateEmpty() {
      var perCentage;
      console.log("enter calculateEmpty: ");
      if( parseInt( $("#eOdoE").val() ) && parseInt( $("#bOdoE").val()) ) {
          $("#totalEmptyMiles").val( parseInt($("#eOdoE").val()) - parseInt($("#bOdoE").val()) );
          LocalDataStore.saveLoadItem("totalEmptyMiles", $("#totalEmptyMiles").val());
          
          $("#beginingLoaded").val($("#eOdoE").val());
          LocalDataStore.saveLoadItem("beginingLoaded", $("#beginingLoaded").val() );
          
          $("#emptyActual").val(parseInt($("#eOdoE").val()) - parseInt($("#bOdoE").val()) );
          LocalDataStore.saveLoadItem("emptyActual", $("#emptyActual").val());
          
          perCentage=((parseInt($("#emptyActual").val()) - parseInt($("#eP").val()))/parseInt($("#eP").val()))*100.0;
          $("#emptyVariance").val(perCentage.toFixed(2));
          LocalDataStore.saveLoadItem("emptyVariance", $("#emptyVariance").val());
      }
  };

  function calculateLoaded() {
      var perCentage;
      console.log("enter calculateLoaded: ");
      if(parseInt($("#eOdoE").val()) && parseInt($("#eOdoL").val())) {
          $("#totalLoadedMiles").val( (parseInt($("#eOdoL").val()) - parseInt($("#eOdoE").val())) );
          LocalDataStore.saveLoadItem("totalLoadedMiles", $("#totalLoadedMiles").val());
          
          $("#loadedActual").val( $("#totalLoadedMiles").val());
          LocalDataStore.saveLoadItem("loadedActual", $("#loadedActual").val());
          
          $("#totalActual").val( parseInt($("#eOdoL").val()) - parseInt($("#bOdoE").val()) );
          LocalDataStore.saveLoadItem("totalActual", $("#totalActual").val());
          
          $("#totalMiles").val( $("#totalActual").val() );
          LocalDataStore.saveLoadItem("totalMiles", $("#totalMiles").val());
          
          perCentage = ( (parseInt($("#loadedActual").val()) - parseInt($("#lP").val())) / parseInt($("#lP").val())) * 100.0;
          $("#loadedVariance").val( perCentage.toFixed(2) );
          LocalDataStore.saveLoadItem("loadedVariance", $("#loadedVariance").val());
          
          perCentage = ( (parseInt($("#totalActual").val()) - parseInt($("#totalPaid").val())) / parseInt($("#totalPaid").val())) * 100.0;
          $("#totalVariance").val( perCentage.toFixed(2) );
          LocalDataStore.saveLoadItem("totalVariance", $("#totalVariance").val());
      }
  };

  $("#loadID").on("blur", function() {
       var ld = $("#loadID").val();
       console.log("Enter #ldNumber.blur: ld= "+ld);
       if( !validateLoadNumber(ld) ) {
          alert("Entered load number ("+ld+") is in error. The Load Number is required and must be composed of seven (7) numeric digits.");
          cancelEvent(window.event);
          return;
        }
        LocalDataStore.initStorage(ld); 
  });

  $("#submitButton1").on("click", function(){
    console.log("Enter submitButton1" );
  });

  $("#submitButton2").on("click", function(){
    console.log("Enter submitButton2" );
    LocalDataStore.save();
    $("#submitButton2").text("Save Load Assignment");
    console.log("   a stopping point");
  });

  $("#selectDayOpts").on("change", function(){
    var loadData = $("#selectDayOpts").val();
    console.log("Enter selectDayOpts/change "+loadData);
    LocalDataStore.saveLoadItem("loadDeliveryDate", loadData);
    console.log("   a stopping point");
  });

  $("#brokerName").on("change", function(){
    var brokerData = $("#brokerName").val();
    console.log(" Enter #brokerName: "+brokerData);
    LocalDataStore.saveLoadItem("brokerName", brokerData);
  });
  $("#brokerLoadID").on("change", function(){
    var brokerData = $("#brokerLoadID").val();
    console.log(" Enter #brokerLoadID: "+brokerData);
    LocalDataStore.saveLoadItem("brokerLoadID", brokerData);
  });
  $("#brokerPhone").on("change", function(){
    var brokerData = $("#brokerPhone").val();
    console.log(" Enter #brokerPhone: "+brokerData);
    LocalDataStore.saveLoadItem("brokerPhone", brokerData);
  });
  $("#LoadTemp").on("change", function(){
    var loadData = $("#LoadTemp").val();
    console.log(" Enter #LoadTemp: "+loadData);
    LocalDataStore.saveLoadItem("loadTemp", loadData);
  });
  $("#preTripped").on("change", function(){
    var loadData = $("#preTripped").prop("checked");
    console.log(" Enter #preTripped: "+loadData);
    LocalDataStore.saveLoadItem("preTripped", loadData);
  });
  $("#tempMatches").on("change", function(){
    var loadData = $("#tempMatches").prop("checked");
    console.log(" Enter #tempMatches: "+loadData);
    LocalDataStore.saveLoadItem("tempMatches", loadData);
  });
  $("#sealMatches").on("change", function(){
    var loadData = $("#sealMatches").prop("checked");
    console.log(" Enter #sealMatches: "+loadData);
    LocalDataStore.saveLoadItem("sealMatches", loadData);
  });
  $("#eP").on("change", function(){       // emptyPaid
    var loadData = $("#eP").val();
    console.log(" Enter #eP (emptyPaid): "+loadData);
    LocalDataStore.saveLoadItem("emptyPaid", loadData);
    calculatePaid();
  });
  $("#lP").on("change", function(){       // loadedPaid
    var loadData = $("#lP").val();
    console.log(" Enter #lP (loadedPaid): "+loadData);
    LocalDataStore.saveLoadItem("loadedPaid", loadData);
    calculatePaid();
  });

  $("#eOdoE").on("change", function(){        // endingOdoEmpty
    var loadData = $("#eOdoE").val();
    console.log(" Enter #eOdoE (endingOdoEmpty): "+loadData);
    LocalDataStore.saveLoadItem("endingEmpty", loadData);
    calculateEmpty();
  });
  $("#eOdoL").on("change", function(){        // endingOdoLoaded
    var loadData = $("#eOdoL").val();
    console.log(" Enter#eOdoL (endingOdoLoaded): "+loadData);
    LocalDataStore.saveLoadItem("endingLoaded", loadData);
    calculateLoaded();
  });
  $("#bOdoE").on("change", function(){        // beginningOdoEmpty
    var loadData = $("#bOdoE").val();   
    console.log(" Enter #bOdoE (beginningOdoEmpty): "+loadData);
    LocalDataStore.saveLoadItem("beginingEmpty", loadData);
    calculateEmpty();
  });
/*
  $("#mainTable").on("", function(){});
  $("#pageTitle").on("", function(){});
  $("#shipperPage").on("", function(){});
  $("#consigneePage").on("", function(){});
  $("#pickPage").on("", function(){});
  $("#dropPage").on("", function(){});
  $("#fuelPage").on("", function(){});
  $("#loadAction").on("", function(){});
  $("#loadStartDate").on("", function(){});
  $("#selectDayOpts").on("focus", function(){});
  $("#emptyActual").on("", function(){});
  $("#emptyVariance").on("", function(){});
  $("#loadedActual").on("", function(){});
  $("#loadedVariance").on("", function(){});
  $("#totalPaid").on("", function(){});
  $("#totalActual").on("", function(){});
  $("#totalVariance").on("", function(){});
  $("#beginingLoaded").on("", function(){});  // beginningOdoLoaded
  $("#totalEmptyMiles").on("", function(){}); //
  $("#totalLoadedMiles").on("", function(){});//
  $("#totalMiles").on("", function(){});      //
*/


});