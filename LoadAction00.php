<?php
# Modified: on Apr 04, 2014 13:12 AM  -
# Modified: on Mar 20, 2014 13:17 AM
# Modified: on Jan 29, 2014 11:52 AM
# Created: on Mar 20, 2012 11:04 AM
#
# loadAssignmentAction  -- all variables
if( isset($_POST["loadNumber"]) ) $loadNumber = $_POST["loadNumber"];
else $loadNumber = "ERROR";
if( isset($_POST["loadActionFlag"]) ) $loadActionFlag = $_POST["loadActionFlag"];
#else $loadActionFlag = "findLoad";
if( isset($_POST["actionButton1"]) ) $actionButton1 = $_POST["actionButton1"];
else $actionButton1 = "NOT_SET";
if( isset($_POST["actionButton2"]) ) $actionButton2 = $_POST["actionButton2"];
else $actionButton2 = "NOT_SET";
# echo "loadNumber: ".$loadNumber."<br />";
# echo "loadActionFlag: ".$loadActionFlag."<br />";
# echo "button1: ".$actionButton1."<br />";
# echo "button2: ".$actionButton2."<br />";
if( isset($_POST["loadTemp"]) ) $loadTemp = $_POST["loadTemp"];
else $loadTemp = "NOT_SET";
if( isset($_POST["loadStartDate"]) ) $loadStartDate = $_POST["loadStartDate"];
else $loadStartDate = "NOT_SET";
if( isset($_POST["loadDeliveryDate"]) ) $loadDeliveryDate = $_POST["loadDeliveryDate"];
else $loadDeliveryDate = "NOT_SET";
# echo "loadDeliveryDate ".$loadDeliveryDate."<br />";
if( isset($_POST["reeferPretripped"]) ) $reeferPretripped = $_POST["reeferPretripped"];
else $reeferPretripped = "";
if( isset($_POST["sealMatches"]) ) $sealMatches = $_POST["sealMatches"];
else $sealMatches = "";
if( isset($_POST["tempMatches"]) ) $tempMatches = $_POST["tempMatches"];
else $tempMatches = "";
if ( $reeferPretripped ) $reeferCheckbox = '<input type="checkbox" name="reeferPretripped" checked tabindex="8" />';
else $reeferCheckbox = '<input type="checkbox" name="reeferPretripped" tabindex="8" />';
if ( $sealMatches ) $tempCheckbox = '<input type="checkbox" name="sealMatches" checked tabindex="10" />';
else $tempCheckbox = '<input type="checkbox" name="sealMatches" tabindex="10" />';
if ( $tempMatches ) $sealCheckbox = '<input type="checkbox" name="tempMatches" checked tabindex="9" />';
else $sealCheckbox = '<input type="checkbox" name="tempMatches" tabindex="9" />';
# echo "reeferPretripped ".$reeferPretripped." checkbox: ".$reeferCheckbox."<br />";
# echo "sealMatches ".$sealMatches." checkbox: ".$sealCheckbox."<br />";
# echo "tempMatches ".$tempMatches." checkbox: ".$tempCheckbox."<br />";
#
# broker information
if( isset($_POST["brokerName"]) ) $brokerName = $_POST["brokerName"];
else $brokerName = "NOT_SET";
if( isset($_POST["brokerLoadID"]) ) $brokerLoadID = $_POST["brokerLoadID"];
else $brokerLoadID = "NOT_SET";
if( isset($_POST["brokerPhone"]) ) $brokerPhone = $_POST["brokerPhone"];
else $brokerPhone = "NOT_SET";
#
#  NOTE:
#    - totalEmptyMiles   = emptyActual
#      totalLoadedMiles  = loadedActual
#      totalMiles            = totalActual
#
#  empty miles Paid, Actual, Variance
if( isset($_POST["emptyPaid"]) && strlen($_POST["emptyPaid"]) ) $emptyPaid = $_POST["emptyPaid"];
else $emptyPaid = "";
if( isset($_POST["emptyActual"]) && strlen($_POST["emptyActual"]) ) $emptyActual = $_POST["emptyActual"];
else $emptyActual = "";
if( isset($_POST["emptyVariance"]) && strlen($_POST["emptyVariance"]) ) $emptyVariance = $_POST["emptyVariance"];
else $emptyVariance = "";
#
#  loaded miles Paid, Actual, Variance
if( isset($_POST["loadedPaid"]) && strlen($_POST["loadedPaid"]) ) $loadedPaid = $_POST["loadedPaid"];
else $loadedPaid = "";
if( isset($_POST["loadedActual"]) && strlen($_POST["loadedActual"]) ) $loadedActual = $_POST["loadedActual"];
else $loadedActual = "";
if( isset($_POST["loadedVariance"]) && strlen($_POST["loadedVariance"]) ) $loadedVariance = $_POST["loadedVariance"];
else $loadedVariance = "";
#
#  total miles Paid, Actual, Variance
if( isset($_POST["totalPaid"]) && strlen($_POST["totalPaid"])>0 ) $totalPaid = $_POST["totalPaid"];
else $totalPaid = "";
if( isset($_POST["totalActual"]) && strlen($_POST["totalActual"])>0 ) $totalActual = $_POST["totalActual"];
else $totalActual = "";
if( isset($_POST["totalVariance"]) && strlen($_POST["totalVariance"])>0 ) $totalVariance = $_POST["totalVariance"];
else $totalVariance = "";
#
#  ending raw odometer readings - ending empty, ending loaded
if( isset($_POST["endingEmpty"]) && strlen($_POST["endingEmpty"])>0 ) $endingEmpty = $_POST["endingEmpty"];
else $endingEmpty = "";
if( isset($_POST["endingLoaded"]) && strlen($_POST["endingLoaded"])>0 ) $endingLoaded = $_POST["endingLoaded"];
else $endingLoaded = "";
#
# beginning raw odometer readings - beginning empty, beginning loaded
if( isset($_POST["beginingEmpty"]) && strlen($_POST["beginingEmpty"])>0 ) $beginingEmpty = $_POST["beginingEmpty"];
else $beginingEmpty = "";
if( isset($_POST["beginingLoaded"]) && strlen($_POST["beginingLoaded"])>0 ) $beginingLoaded = $_POST["beginingLoaded"];
else $beginingLoaded = "";
#
# total miles empty, loaded, trip
if( isset($_POST["totalEmptyMiles"]) && strlen($_POST["totalEmptyMiles"])>0 ) $totalEmptyMiles = $_POST["totalEmptyMiles"];
else $totalEmptyMiles = "";
if( isset($_POST["totalLoadedMiles"]) && strlen($_POST["totalLoadedMiles"])>0 ) $totalLoadedMiles = $_POST["totalLoadedMiles"];
else $totalLoadedMiles = "";
if( isset($_POST["totalMiles"]) && strlen($_POST["totalMiles"])>0 ) $totalMiles = $_POST["totalMiles"];
else $totalMiles = "";
#
#
# if the loadActionFlag is  new then create the load file
# else open the file
# PROBLEM - what about modifications?
$dbLoadRecData = array( "loadNumber"=>" ","loadActionFlag"=>"","actionButton1"=>"","actionButton2"=>"",
                                   "loadStartDate"=>"","loadDeliveryDate"=>"",
                                   "brokerName"=>"","brokerLoadID"=>"","brokerPhone"=>"",
                                   "loadTemp"=>"","reeferPretripped"=>"","sealMatches"=>"","tempMatches"=>"",
                                   "emptyPaid"=>"","loadedPaid"=>"","totalPaid"=>"",
                                   "endingEmpty"=>"","beginingEmpty"=>"","endingLoaded"=>"","beginingLoaded"=>"",
                                   "emptyActual"=>"","loadedActual"=>"","totalActual"=>"",
                                   "emptyVariance"=>"","loadedVariance"=>"","totalVariance"=>"" );
$dbRec = "";
$fileName = "";
$fileStatus = "Initiate file processing. <br />";
#
# if a newload then create the file
# else open the file for modification
# Note:  - modifications are because incoming data is considered as not the same as existing data?
if ( ($loadNumber == "ERROR") || ($loadNumber == "") ) {
   echo "  *** A Loadnumber is required. Processing is terminated.<br />";
   $loadNumber = "";
   $loadActionFlag = "new";
   $actionButton1 = "New/Find";
   $actionButton2 = "Add/Clear";
   } else {
   $fileName = "loadData/testLoad_".$loadNumber.".txt";
#     echo "File: ".$fileName."<br />";
#     echo "  Status: ".$fileStatus;
#     echo count($dbLoadRecData)." elements in dbLoadRecData.<br />";
#     print_r(error_get_last());
   if ( file_exists($fileName) ) {
      echo "File: ".$fileName." exists.<br />";
#  files exists so we have either request to modify the current load or a request to find another load. Which
#  course of action depends on the variables set by the submit buttons; actionButton1 or actionButton2; and
#  the loadActionFlag
      if ( $fH = fopen($fileName, "r+") ) {
         $fileStatus = " File ".$fileName." opened in READ mode.<br />";
#         echo $fileStatus;
         if ( ($loadActionFlag == "new") && ($actionButton1 == "New/Find") ) {
            $loadActionFlag = "find";
            $actionButton1 = "Find";
            $actionButton2 = "Change";
            } elseif ( ($loadActionFlag == "new") && ($actionButton2 == "Add/Clear") ) {
            $loadActionFlag = "change";
            $actionButton1 = "Find";
            $actionButton2 = "Change";
         }
#  if file data item is not blank change it
         if ( $dbRec = fread($fH,1024) ) {
            $fileStatus = " File ".$fileName." data file is read.<br />";
#            echo "Read ".strlen($dbRec)." characters.";
            $dbRecArray = explode("\t",$dbRec,count($dbLoadRecData));
            $idx = 0;
            foreach ($dbLoadRecData as $parm=>$parmValue) {
               switch ($parm) {
                  case "loadNumber":
                     if( $loadActionFlag == "find" ) {
                        if ( $loadNumber == $dbLoadRecData[$parm] ) echo "Found Load: ".$loadNumber."<br />";
                     }
                     else $dbLoadRecData[$parm] = $loadNumber;
                  break;
                  case "loadActionFlag":
#                  if( $dbRecArray[$idx] != $loadActionFlag ) {
#                     $dbLoadRecData[$parm] = $loadActionFlag;
#                  }
                  break;
                  case "actionButton1":
                  if( $dbRecArray[$idx] != $actionButton1 ) {
                     $dbLoadRecData[$parm] = $actionButton1;
                  }
                  break;
                  case "actionButton2":
                  if( $dbRecArray[$idx] != $actionButton2) {
                     $dbLoadRecData[$parm] = $actionButton2;
                  }
                  break;
                  case "loadStartDate":
                     if( $dbRecArray[$idx] != $loadStartDate ) $dbLoadRecData[$parm] = $loadStartDate;
                  break;
                  case "loadDeliveryDate":
                     if( $dbRecArray[$idx] != $loadDeliveryDate ) $dbLoadRecData[$parm] = $loadDeliveryDate;
                  break;
                  case "brokerName":
                     if( $dbRecArray[$idx] != $brokerName ) $dbLoadRecData[$parm] = $brokerName;
                  break;
                  case "brokerLoadID":
                     if( $dbRecArray[$idx] != $brokerLoadID ) $dbLoadRecData[$parm] = $brokerLoadID;
                  break;
                  case "brokerPhone":
                     if( $dbRecArray[$idx] != $brokerPhone ) $dbLoadRecData[$parm] = $brokerPhone;
                  break;
                  case "loadTemp":
                     if( $dbRecArray[$idx] != $loadTemp ) $dbLoadRecData[$parm] = $loadTemp;
                  break;
                  case "reeferPretripped":
                     if( $dbRecArray[$idx] != $reeferPretripped ) $dbLoadRecData[$parm] = $reeferPretripped;
                  break;
                  case "sealMatches":
                     if( $dbRecArray[$idx] != $sealMatches ) $dbLoadRecData[$parm] = $sealMatches;
                  break;
                  case "tempMatches":
                     if( $dbRecArray[$idx] != $tempMatches ) $dbLoadRecData[$parm] = $tempMatches;
                  break;
                  case "emptyPaid":
                     if( $dbRecArray[$idx] != $emptyPaid ) $dbLoadRecData[$parm] = $emptyPaid;
                  break;
                  case "loadedPaid":
                     if( $dbRecArray[$idx] != $loadedPaid ) $dbLoadRecData[$parm] = $loadedPaid;
                  break;
                  case "totalPaid":
                     if( $dbRecArray[$idx] != $totalPaid ) $dbLoadRecData[$parm] = $totalPaid;
                  break;
                  case "endingEmpty":
                     if( $dbRecArray[$idx] != $endingEmpty ) $dbLoadRecData[$parm] = $endingEmpty;
                  break;
                  case "beginingEmpty":
                     if( $dbRecArray[$idx] != $beginingEmpty ) $dbLoadRecData[$parm] = $beginingEmpty;
                  break;
                  case "endingLoaded":
                     if( $dbRecArray[$idx] != $endingLoaded ) $dbLoadRecData[$parm] = $endingLoaded;
                  break;
                  case "beginingLoaded":
                     if( $dbRecArray[$idx] != $beginingLoaded ) $dbLoadRecData[$parm] = $beginingLoaded;
                  break;
                  case "emptyActual":
                     if( $dbRecArray[$idx] != $emptyActual ) $dbLoadRecData[$parm] = $emptyActual;
                  break;
                  case "loadedActual":
                     if( $dbRecArray[$idx] != $loadedActual ) $dbLoadRecData[$parm] = $loadedActual;
                  break;
                  case "totalActual":
                     if( $dbRecArray[$idx] != $totalActual ) $dbLoadRecData[$parm] = $totalActual;
                  break;
                  case "emptyVariance":
                     if( $dbRecArray[$idx] != $emptyVariance ) $dbLoadRecData[$parm] = $emptyVariance;
                  break;
                  case "loadedVariance":
                     if( $dbRecArray[$idx] != $loadedVariance ) $dbLoadRecData[$parm] = $loadedVariance;
                  break;
                  case "totalVariance":
                     if( $dbRecArray[$idx] != $totalVariance ) $dbLoadRecData[$parm] = $totalVariance;
                  break;
               } # end switch
               $idx += 1;
# echo $parm."=".$dbLoadRecData[$parm]." <br />";
            } # end foreach
#put modified data back in storage
            $dbRec = "";
            rewind($fH);
            $dbRec = sprintf("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\r\n",
                                   $loadNumber,$loadActionFlag,$actionButton1,$actionButton2,
                                   $loadStartDate,$loadDeliveryDate,
                                   $brokerName,$brokerLoadID,$brokerPhone,
                                   $loadTemp,$reeferPretripped,$sealMatches,$tempMatches,
                                   $emptyPaid,$loadedPaid,$totalPaid,
                                   $endingEmpty,$beginingEmpty,$endingLoaded,$beginingLoaded,
                                   $emptyActual,$loadedActual,$totalActual,
                                   $emptyVariance,$loadedVariance,$totalVariance," ");
            fwrite($fH,$dbRec);
#            echo "Wrote ",strlen($dbRec)." characters.";
            fclose($fH);
            } else {
            $fileStatus = "FAILED reading data file.<br />";
            print_r(error_get_last());
         }
#         echo $fileStatus;
#         fclose($fH);
         } else {
         $fileStatus = " File ".$fileName." could not be opened.<br />";
#         echo $fileStatus;
         print_r(error_get_last());
         }
      } else {  # file does not exist -  this is a New Load
      if ( $fH = fopen($fileName, "w+") )  {
         $fileStatus = " File ".$fileName." is opened with write mode. <br />";
         if ( $loadActionFlag == "new" ) {
            $loadActionFlag = "Find";
            $actionButton1 = "Find";
            $actionButton2 = "Modify/Change";
#            echo $fileStatus;
            $dbRec = "";
            $dbRec = sprintf("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\r\n",
                                   $loadNumber,$loadActionFlag,$actionButton1,$actionButton2,
                                   $loadStartDate,$loadDeliveryDate,
                                   $brokerName,$brokerLoadID,$brokerPhone,
                                   $loadTemp,$reeferPretripped,$sealMatches,$tempMatches,
                                   $emptyPaid,$loadedPaid,$totalPaid,
                                   $endingEmpty,$beginingEmpty,$endingLoaded,$beginingLoaded,
                                   $emptyActual,$loadedActual,$totalActual,
                                   $emptyVariance,$loadedVariance,$totalVariance," ");
            fwrite($fH,$dbRec);
#            echo "Wrote ",strlen($dbRec)." characters.";
            fclose($fH);
            $fileStatus = " File ".$fileName." new data is added. <br />";
#            echo $fileStatus;
            } else {
#            echo " File: ".$fileName." could not be opend in w+ mode. <br />";
            print_r(error_get_last());
         }
         } else {
#         echo " File: ".$fileName." NOT opened. <br />";
         print_r(error_get_last());
      }
#      fclose($fH);
   }
}
echo <<<_END
<html lang="en-US">
<head>
<title>Load Assignment</title>
<meta charset="UTF-8" />
<!--     <link rel="stylesheet" type="text/css" href="./data/loadassignmentstyle.css" />   -->
<style type="text/css">
body { background-color:#EBBEBE;  }
#emptyCell { background-color:#00002A; }
#titleCell { background-color:#BC9898; }
#computedCell { background-color:#FF7D4D; }
#pageTitle { text-align:center;
   color:#00002A;
font-size:2.25em; }
#cright { font-size:.75em; }
h2  { text-align:center;
color:#00002A;  }
.menubar ul { list-style:none;
   background-color:#FF99FF;
   text-align:center;
   padding:0px;
width:490px;  }
.menubar ul li { display:inline;  }
.menubar ul li a { /*Increase Clickable Area*/
   padding:0px;
   padding-left:15px;
   padding-right:15px;
   /*Remove the Underline for the Link*/
   text-decoration:none;
   color:#000;
background:#FF99FF;  }
/*On Mouse Over the Link*/
.menubar ul li a:hover { color:#fff;
background:#00002A; }
</style>
        <script type="text/javascript">

function catchEvent(eventObj, event, eventHandler) {
   if (eventObj.addEventListener) {
      eventObj.addEventListener(event, eventHandler, false);
      } else if (eventObj.attachEvent) {
      event = "on" + event;
      eventObj.attachEvent(event, eventHandler);
   }
}

function cancelEvent(evnt) {
   if (evnt.preventDefault) {
      evnt.preventDefault();
      evnt.stopPropagation();
      } else {
      evnt.returnValue = false;
      evnt.cancelBubble = true;
   }
}

function setupEvents(evnt) {
   var formObj = document.getElementById("loadForm");
   if ( formObj ) {
      catchEvent(formObj, "submit", validateForm);
   }
}

function validateForm (evnt) {
   var theEvent = evnt ? evnt : window.event;
   var target = theEvent.target ? theEvent.target : theEvent.srcElement;
   var inputFlds = document.getElementById("loadForm").getElementsByTagName("input");
   var varNwLd = document.getElementById("varNwLd");
   var varldStrt = document.getElementById("ldStrtDt");
# if a new load set the start date to today_s date
   if ( varNwLd.value == "new" ) {
      varldStrt.value = todaysMonth + "/" + todaysDay + "/" + todaysYear;
#        alert("New start date id: " + varldStrt.value + ".");
   }
   else {
#        alert("Old start date is: " + varldStrt.value + ".");
   }
}

# loadNumber must be 7 digits
function validateLoadNumber(evnt) {
   var theEvent = evnt ? evnt : window.event;
   var loadNumberPattern = /^[0-9]*$/g;
   var OK = false;
   if (theEvent.name == "loadNumber") {
      if (loadNumberPattern.test(theEvent.value) && theEvent.value.length == 7) {
         OK = true;
         } else {
         OK = false;
         alert("The Load Number is required and must be composed of 7 digits only.");
         theEvent.value = "";
         cancelEvent(evnt);
      }
   }
}

var days=["01","02","03","04","05","06","07","08","09","10","11","12","13","14",
              "15","16","17","18","19","20","21","22","23","24","25","26","27","28",
              "29","30","31"];
var daysInMonth=[31,0,31,30,31,30,31,31,30,31,30,31];
var todaysdate = new Date();
var todaysYear = todaysdate.getFullYear();
var todaysMonth = todaysdate.getMonth()+1;
var todaysDay = todaysdate.getDate();

function initVariables(evnt) {
   var theEvent = evnt ? evnt : window.event;
   var target = theEvent.target ? theEvent.target : theEvent.srcElement;
#  generate one week of possible delivery dates starting with $loadStartDate
#  $loadDeliveryDate
   var startDate = "$loadStartDate";
   var dlvryDate = "$loadDeliveryDate";
   var dd = startDate.substr(startDate.indexOf("/")+1,startDate.lastIndexOf("/")-startDate.indexOf("/")-1);
   var mm = startDate.substr(0,startDate.indexOf("/"));
   var yyyy = startDate.substr(startDate.lastIndexOf("/")+1,4);
   var optDate = "";
//var msg="From: "+startDate+" got dd="+dd+" mm="+mm+" yyyy="+yyyy;
//alert(msg);
//alert("start date string length: "+startDate.length);
//alert("dlvry date string length: "+dlvryDate.length);
var selectDayFlds = document.getElementById("selectDayOpts").options;
//var oD = new Date(todaysYear, todaysMonth-1, 1);
   var oD = new Date(yyyy,mm-1, 1);
   oD.od=oD.getDay()+1;
   daysInMonth[1]=(((oD.getFullYear()%100!==0)&&(oD.getFullYear()%4===0))||(oD.getFullYear()%400===0))?29:28;
//dayIdx = todaysDay - 1;
//mnthIdx = todaysMonth - 1;
//yR = todaysYear;
   dayIdx = dd - 1;
   mnthIdx = mm - 1;
   yR = yyyy;
# loop to generate dates   
   for (var i = 0; i < selectDayFlds.length; i++ ) {
      optDate = days[mnthIdx] + "/" + days[dayIdx] + "/" + yR;
//alert("opt date string length: "+optDate.length);
//alert(optDate+" - "+dlvryDate);
      selectDayFlds[i].innerHTML = optDate;
      selectDayFlds[i].value = optDate;
# if specified date mark it selected
      if ( optDate == dlvryDate ) {
         var atr=document.createAttribute("selected");
         selectDayFlds[i].setAttributeNode(atr);
         msg="Found load delivery date: "+dlvryDate+"<br />";
         alert(msg);
      }
      dayIdx++;
# check for end of month and end of year      
      if ( dayIdx+1 > daysInMonth[mnthIdx] ) {
         dayIdx = 0;
         mnthIdx++;
         if ( mnthIdx+1 > 11 ) {
            mnthIdx = 0;
            yR++;
         }
      }
   }
   //    selectDayFlds[0].selected = true;
}

catchEvent(window, "load", setupEvents);
catchEvent(window, "load", initVariables);

function checkPaidMiles(evnt) {
   var theEvent = evnt ? evnt : window.event;
   var mileageNumberPattern = /^[0-9]+.?[0-9]*$/g;
   if ( (theEvent.value.length> 0) && !mileageNumberPattern.test(theEvent.value) ) {
      alert('Miles are digits with a whole and optional fractional part seperated by a ".".');
      theEvent.value = "";
      cancelEvent(evnt);
   }
   else {
      calculatePaidMiles();
   }
}

function calculatePaidMiles() {
   var inputFlds = document.getElementById("loadForm").getElementsByTagName("input");
   var emptyPaidIdx = -1;
   var loadedPaidIdx = -1;
   var totalPaidIdx = -1;
   var emptyActualIdx = -1;
   var loadedActualIdx = -1;
   var totalActualIdx = -1;
   var emptyVarianceIdx = -1;
   var loadedVarianceIdx = -1;
   var totalVarianceIdx = -1;
   var miles = 0;
   var variance = 0;
   for (var i = 0; i < inputFlds.length; i++ ) {
      if (inputFlds[i].type != "submit") {
         switch (inputFlds[i].name) {
            case "emptyPaid":
               emptyPaidIdx = i;
            break;
            case "loadedPaid":
               loadedPaidIdx = i;
            break;
            case "totalPaid":
               totalPaidIdx = i;
            break;
            case "emptyActual":
               emptyActualIdx = i;
            break;
            case "loadedActual":
               loadedActualIdx = i;
            break;
            case "totalActual":
               totalActualIdx = i;
            break;
            case "emptyVariance":
               emptyVarianceIdx = i;
            break;
            case "loadedVariance":
               loadedVarianceIdx = i;
            break;
            case "totalVariance":
               totalVarianceIdx = i;
         }
      }
   }
   if ( inputFlds[emptyPaidIdx].value>0 && inputFlds[loadedPaidIdx].value>0 ) {
      var emptyMiles = new Number(inputFlds[emptyPaidIdx].value);
      var loadedMiles = new Number(inputFlds[loadedPaidIdx].value);
      inputFlds[totalPaidIdx].value = inputFlds[emptyPaidIdx].value + inputFlds[loadedPaidIdx].value;
      miles = valueOf(emptyMiles) + valueOf(loadedMiles);
      alert("checking paid miles: "+miles+" total paid: "+inputFlds[totalPaidIdx].value);
   }
   if ( inputFlds[emptyActualIdx].value>0 && inputFlds[loadedActualIdx].value>0 ) {
      miles = inputFlds[emptyActualIdx].value + inputFlds[loadedActualIdx].value;
      inputFlds[totalActualIdx].value = miles.toString();
   }
   if ( inputFlds[emptyPaidIdx].value>0 && inputFlds[emptyActualIdx].value>0 ) {
      variance = ((inputFlds[emptyActualIdx].value - inputFlds[emptyPaidIdx].value) / inputFlds[emptyPaidIdx].value) * 100;
      inputFlds[emptyVarianceIdx].value = variance.toFixed(1);
   }
   if ( inputFlds[loadedPaidIdx].value>0 && inputFlds[loadedActualIdx].value>0 ) {
      variance = ((inputFlds[loadedActualIdx].value - inputFlds[loadedPaidIdx].value) / inputFlds[loadedPaidIdx].value) * 100;
      inputFlds[loadedVarianceIdx].value = variance.toFixed(1);
   }
   if ( inputFlds[totalPaidIdx].value>0 && inputFlds[totalActualIdx].value>0 ) {
      variance = ((inputFlds[totalActualIdx].value - inputFlds[totalPaidIdx].value) / inputFlds[totalPaidIdx].value) * 100;
      inputFlds[totalVarianceIdx].value = variance.toFixed(1);
   }
}

function checkOdoMiles(evnt) {
   var theEvent = evnt ? evnt : window.event;
   var mileageNumberPattern = /^[0-9]+.?[0-9]*$/g;
   if ( (theEvent.value.length>0) && !mileageNumberPattern.exec(theEvent.value) ) {
      alert('Miles are digits with a whole and optional fractional part seperated by a ".".');
      theEvent.value = "";
      cancelEvent(evnt);
   }
   else {
      calculateOdoMiles();
   }
}

function calculateOdoMiles() {
   var inputFlds = document.getElementById("loadForm").getElementsByTagName("input");
   var emptyPaidIdx = -1;
   var loadedPaidIdx = -1;
   var totalPaidIdx = -1;
   var emptyActualIdx = -1;
   var loadedActualIdx = -1;
   var totalActualIdx = -1;
   var emptyVarianceIdx = -1;
   var loadedVarianceIdx = -1;
   var totalVarianceIdx = -1;
   var beginingEmptyIdx = -1;
   var endingEmptyIdx = -1;
   var totalEmptyMilesIdx = -1;
   var beginingLoadedIdx = -1;
   var endingLoadedIdx = -1;
   var totalLoadedMilesIdx = -1;
   var totalMilesIdx = -1;
   
   for (var i = 0; i < inputFlds.length; i++ ) {
      if (inputFlds[i].type != "submit") {
         switch (inputFlds[i].name) {
            case "beginingEmpty":
               beginingEmptyIdx = i;
            break;
            case "endingEmpty":
               endingEmptyIdx = i;
            break;
            case "totalEmptyMiles":
               totalEmptyMilesIdx = i;
            break;
            case "beginingLoaded":
               beginingLoadedIdx = i;
            break;
            case "endingLoaded":
               endingLoadedIdx = i;
            break;
            case "totalLoadedMiles":
               totalLoadedMilesIdx = i;
            break;
            case "totalMiles":
               totalMilesIdx = i;
            break;
            case "emptyPaid":
               emptyPaidIdx = i;
            break;
            case "loadedPaid":
               loadedPaidIdx = i;
            break;
            case "totalPaid":
               totalPaidIdx = i;
            break;
            case "emptyActual":
               emptyActualIdx = i;
            break;
            case "loadedActual":
               loadedActualIdx = i;
            break;
            case "totalActual":
               totalActualIdx = i;
            break;
            case "emptyVariance":
               emptyVarianceIdx = i;
            break;
            case "loadedVariance":
               loadedVarianceIdx = i;
            break;
            case "totalVariance":
               totalVarianceIdx = i;
         }
      }
   }
   if ( inputFlds[beginingEmptyIdx].value>0 && inputFlds[endingEmptyIdx].value>0 ) {
      inputFlds[totalEmptyMilesIdx].value = inputFlds[endingEmptyIdx].value - inputFlds[beginingEmptyIdx].value;
      inputFlds[beginingLoadedIdx].value = inputFlds[endingEmptyIdx].value;
      inputFlds[emptyActualIdx].value = inputFlds[totalEmptyMilesIdx].value;
   }
   if ( inputFlds[beginingLoadedIdx].value>0 && inputFlds[endingLoadedIdx].value>0 ) {
      inputFlds[totalLoadedMilesIdx].value = inputFlds[endingLoadedIdx].value - inputFlds[beginingLoadedIdx].value;
      inputFlds[loadedActualIdx].value = inputFlds[totalLoadedMilesIdx].value;
   }
   if (inputFlds[totalEmptyMilesIdx].value>0 && inputFlds[totalLoadedMilesIdx].value>0 ) {
      inputFlds[totalMilesIdx].value = inputFlds[totalEmptyMilesIdx].value + inputFlds[totalLoadedMilesIdx].value;
      inputFlds[totalActualIdx].value = inputFlds[totalMilesIdx].value;
   }
   calculatePaidMiles();
}
</script>
  </head>
  <body>
    <form id="loadForm" action="LoadAction00.php" method="post">
      <table border="0" align="center" width="80%">
        <tr><td colspan="6" id="pageTitle">Load Assignment Home</td></tr>
        <tr>
          <td colspan="1">&nbsp;</td>
          <td align="center" colspan="4">
            <div class="menubar">
              <ul>
                <li><a href="pagedloadassignment01.html" tabindex="17">Shipper</a></li>
                <li><a href="pagedloadassignment02.html" tabindex="18">Consignee</a></li>
                <li><a href="pagedloadassignment03.html" tabindex="19">Pick(s)</a></li>
                <li><a href="pagedloadassignment04.html" tabindex="20">Drop(s)</a></li>
                <li><a href="pagedloadassignment05.html" tabindex="21">Fuel</a></li>
              </ul>
            </div>
          </td>
          <td colspan="1">&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
          <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <table border="0" align="center" cellpadding="1" cellspacing="0">
              <tr>
                <td align="left">Load &#35;:&nbsp;<font color="red" font-size="3em">*</font></td>
                <td align="left">
                  <input type="text" size="20" name="loadNumber" value="$loadNumber"; tabindex="1" onblur="validateLoadNumber(this)" />
                </td>
                <td align="center">
                  <input id="varNwLd" type="hidden" name="loadActionFlag" value="$loadActionFlag" />
                  <input id="ldStrtDt" type="hidden" name="loadStartDate" value="$loadStartDate" />
                  <input type="submit" name="actionButton1" value="$actionButton1" tabindex="2" />
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
            </table>
          </td>
          <td colspan="3" align="center">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top">Delivery:</td>
                <td align="left">
                  <select id="selectDayOpts" name="loadDeliveryDate" value="$loadDeliveryDate" tabindex="3" onfocus="initVariables(this)" >
                    <option value="01/01/2011">01/01/2011</option>
                    <option value="01/02/2011">01/02/2011</option>
                    <option value="01/03/2011">01/03/2011</option>
                    <option value="01/04/2011">01/04/2011</option>
                    <option value="01/05/2011">01/05/2011</option>
                    <option value="01/06/2011">01/06/2011</option>
                    <option value="01/07/2011">01/07/2011</option>
                  </select>
                </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td align="left">mm / dd / yyyy</td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </td>
        <tr>
                <td align="center" colspan="6">&nbsp;</td>
              </tr>
            </tr>
            <tr>
              <td align="left" colspan="3">
                <table border="0" align="center" cellpadding="5">
                  <tr>
                    <td>Broker Name:</td>
                    <td>
                      <input type="text" size="20" name="brokerName" value="$brokerName" tabindex="4" />
                    </td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Broker #:</td>
                    <td>
                      <input type="text" size="20" name="brokerLoadID" value="$brokerLoadID" tabindex="5" />
                    </td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Broker Phone:</td>
                    <td>
                      <input type="text" size="20" name="brokerPhone" value="$brokerPhone" tabindex="6" />
                    </td>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
            </table>
          </td>
          <td colspan="3" align="center">
            <table border="0" cellpadding="5">
              <tr>
                <td>
                  <input type="text" size="5" name="loadTemp" value="$loadTemp" tabindex="7" />
                </td>
                  <td align="left">BOL Temp:</td>
                  <td>&nbsp;</td>
              </tr>
              <tr>
                <td align="center">$reeferCheckbox</td>
                <td align="left">Reefer Pretrip</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align="center">$sealCheckbox</td>
                <td align="left">Set Temp Matches BOL</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align="center">$tempCheckbox</td>
                <td align="left">Seal Matches BOL</td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" colspan="6">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">
            <table border="1" cellspacing="1" cellpadding"3" width="90%">
              <tr>
                <td id="emptyCell" style="width:25%" align="center">&nbsp;</td>
                <td id="titleCell" width="25%" align="center">Paid</td>
                <td id="titleCell" width="25%" align="center">Actual</td>
                <td id="titleCell" width="25%" align="center">Variance (%)</td>
              </tr>
              <tr>
                <td id="titleCell" align="center">Empty</td>
                <td align="center"><input type="number" size="8" name="emptyPaid" value=$emptyPaid tabindex="11" onblur="checkPaidMiles(this)" /></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="emptyActual" value="$emptyActual" ></output></td>
                <td id="computedCell" align="center"><outputtype="text" size="8" name="emptyVariance" value=$emptyVariance ></output></td>
              </tr>
              <tr>
                <td id="titleCell" align="center">Loaded</td>
                <td align="center"><input type="number" size="8" name="loadedPaid" value=$loadedPaid tabindex="12" onblur="checkPaidMiles(this)" /></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="loadedActual" value=$loadedActual ></output></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="loadedVariance" value=$loadedVariance ></output></td>
              </tr>
              <tr>
                <td id="titleCell" align="center">Total</td>
                <td id="computedCell" align="center"><output type="text" size="8" name="totalPaid" value=$totalPaid ></output></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="totalActual" value=$totalActual ></output></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="totalVariance" value=$totalVariance ></output></td>
              </tr>
            </table>
          </td>
          <td align="center" colspan="3">
            <table border="1" cellspacing="1" cellpadding"3" width="90%">
              <tr>
                <td id="emptyCell" style="width:25%" align="center">&nbsp;</td>
                <td id="titleCell" style="width:25%" align="center">Empty</td>
                <td id="titleCell" style="width:25%" align="center">Loaded</td>
                <td id="titleCell" style="width:25%" align="center">Total</td>
              </tr>
              <tr>
                <td id="titleCell" align="center">End Odo</td>
                <td align="center"><input type="number" size="8" name="endingEmpty" value =$endingEmpty tabindex="14" onblur="checkOdoMiles(this)" /></td>
                <td align="center"><input type="number" size="8" name="endingLoaded" value =$endingLoaded tabindex="15" onblur="checkOdoMiles(this)" /></td>
                <td id="emptyCell">&nbsp;</td>
              </tr>
              <tr>
                <td id="titleCell" align="center">Start Odo</td>
                <td align="center"><input type="number" size="8" name="beginingEmpty" value =$beginingEmpty tabindex="13" onblur="checkOdoMiles(this)" /></td>
                <td id="computedCell" align="center"><output type="number" size="8" name="beginingLoaded" value =$beginingLoaded readonly /></output></td>
                <td id="emptyCell">&nbsp;</td>
              </tr>
              <tr>
                <td id="titleCell" align="center">Total Miles</td>
                <td id="computedCell" align="center"><output type="text" size="8" name="totalEmptyMiles" value ="$totalEmptyMiles" readonly" /></output></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="totalLoadedMiles" value ="$totalLoadedMiles" readonly /></output></td>
                <td id="computedCell" align="center"><output type="text" size="8" name="totalMiles" value =$totalMiles readonly /></output></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="6" align="center">
            <input type="submit" name="actionButton" value="Update Load Assignment" tabindex="16" />
          </td>
        </tr>
      </table>
    </form>
    <p><font color="red" font-size="1em">*&nbsp;Required field</font></p>
    <p id="cright">&nbsp;&copy;&nbsp;2011&nbsp;Vallecito Software</p>
  </body>
</html>
_END;
?>
