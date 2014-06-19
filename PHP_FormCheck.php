<?php
#
# Shipper, Consignee, PU/Drop  -- all variables
#
# Shipper information
if( isset($_POST["shipperBOL"]) ) $shipperBOL = $_POST["shipperBOL"];
if( isset($_POST["shipperSealOut"]) ) $shipperSealOut = $_POST["shipperSealOut"];
if( isset($_POST["shipperCountry"]) ) $shipperCountry = $_POST["shipperCountry"];
if( isset($_POST["shipperZip"]) ) $shipperCountry = $_POST["shipperZip"];
if( isset($_POST["shipperName"]) ) $shipperName = $_POST["shipperName"];
if( isset($_POST["shipperStreetAddr"]) ) $shipperStreetAddr = $_POST["shipperStreetAddr"];
if( isset($_POST["shipperCity"]) ) $shipperCity = $_POST["shipperCity"];
if( isset($_POST["shipperState"]) ) $shipperState = $_POST["shipperState"];
if( isset($_POST["shipperP_UNumber"]) ) $shipperP_UNumber = $_POST["shipperP_UNumber"];
if( isset($_POST["shipperP_UDate"]) ) $shipperP_UDate = $_POST["shipperP_UDate"];
if( isset($_POST["shipperP_UTime"]) ) $shipperP_UTime = $_POST["shipperP_UTime"];
if( isset($_POST["shipperP_UComplete"]) ) $shipperP_UTime = $_POST["shipperP_UComplete"];
#
# Consignee information
if( isset($_POST["consigneeSealIn"]) ) $consigneeSealIn = $_POST["consigneeSealIn"];
if( isset($_POST["consigneeCountry"]) ) $consigneeCountry = $_POST["consigneeCountry"];
if( isset($_POST["consigneeZip"]) ) $consigneeCountry = $_POST["consigneeZip"];
if( isset($_POST["consigneeName"]) ) $consigneeName = $_POST["consigneeName"];
if( isset($_POST["consigneeStreetAddr"]) ) $consigneeStreetAddr = $_POST["consigneeStreetAddr"];
if( isset($_POST["consigneeCity"]) ) $consigneeCity = $_POST["consigneeCity"];
if( isset($_POST["consigneeState"]) ) $consigneeState = $_POST["consigneeState"];
if( isset($_POST["consigneeApptNumber"]) ) $consigneeApptNumber = $_POST["consigneeApptNumber"];
if( isset($_POST["consigneeApptDate"]) ) $consigneeApptDate = $_POST["consigneeApptDate"];
if( isset($_POST["consigneeApptTime"]) ) $consigneeApptTime = $_POST["consigneeApptTime"];
if( isset($_POST["consigneeDeliveryComplete"]) ) $consigneeApptTime = $_POST["consigneeDeliveryComplete"];
#
# P/U - Drop information
if( isset($_POST["pickupDrop"]) ) $pickupDrop = $_POST["pickupDrop"]; else $pickupDrop = "not_set";
if( isset($_POST["puDropSealIn"]) ) $puDropSealIn = $_POST["puDropSealIn"];
if( isset($_POST["puDropSealOut"]) ) $puDropSealOut = $_POST["puDropSealOut"];
if( isset($_POST["puDropCountry"]) ) $puDropCountry = $_POST["puDropCountry"];
if( isset($_POST["puDropZip"]) ) $puDropCountry = $_POST["puDropZip"];
if( isset($_POST["puDropName"]) ) $puDropName = $_POST["puDropName"];
if( isset($_POST["puDropStreetAddr"]) ) $puDropStreetAddr = $_POST["puDropStreetAddr"];
if( isset($_POST["puDropCity"]) ) $puDropCity = $_POST["puDropCity"];
if( isset($_POST["puDropState"]) ) $puDropState = $_POST["puDropState"];
if( isset($_POST["puDropAppointment"]) ) $puDropAppointment = $_POST["puDropAppointment"];
if( isset($_POST["puDropDate"]) ) $puDropDate = $_POST["puDropDate"];
if( isset($_POST["puDropTime"]) ) $puDropTime = $_POST["puDropTime"];
if( isset($_POST["puDropComplete"]) ) $puDropTime = $_POST["puDropTimeComplete"];
#
echo <<<_END
<html lang="en-US">
<head>
<title>Load Assignment</title>
<meta charset="UTF-8" />
</head>
<body>
<p>
Data File: $fileName <br />
File Status: $fileStatus <br />
</p>
<p>
<h2>Load Information</h2>
loadNumber = $loadNumber<br />


# <h2>Shipper</h2>
# shipperBOL = $shipperBOL<br />
# shipperSealOut = $shipperSealOut<br />
# shipperCountry = $shipperCountry<br />
# shipperName = $shipperName<br />
# shipperStreetAddr = $shipperStreetAddr<br />
# shipperCity = $shipperCity<br />
# shipperState = $shipperState<br />
# shipperP_UNumber = $shipperP_UNumber<br />
# shipperP_UDate = $shipperP_UDate<br />
# shipperP_UTime = $shipperP_UTime<br />

# <h2>Consignee</h2>
# consigneeSealIn = $consigneeSealIn<br />
# consigneeCountry = $consigneeCountry<br />
# consigneeName = $consigneeName<br />
# consigneeStreetAddr = $consigneeStreetAddr<br />
# consigneeCity = $consigneeCity<br />
# consigneeState = $consigneeState<br />
# consigneeApptNumber = $consigneeApptNumber<br />
# consigneeApptDate = $consigneeApptDate<br />
# consigneeApptTime = $consigneeApptTime<br />

# <h2>Pick/Drop</h2>
# pickupDrop = $pickupDrop<br />
# puDropSealIn = $puDropSealIn<br />
# puDropSealOut = $puDropSealOut<br />
# puDropCountry = $puDropCountry<br />
# puDropName = $puDropName<br />
# puDropStreetAddr = $puDropStreetAddr<br />
# puDropCity = $puDropCity<br />
# puDropState = $puDropState<br />
# puDropAppointment = $puDropAppointment<br />
# puDropDate = $puDropDate<br />
# puDropTime = $puDropTime<br />

</p>
</body>
</html>
_END;
?>
