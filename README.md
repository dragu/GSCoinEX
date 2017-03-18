# GSCoinEX
Google Spreadsheat Cryptocoins Exchange feeder

Exchanges currently supported: Poloniex, BitBay, BitMarket

Copyright (c)2017 Michal "gaco" Gacek, released under GPLv3 License

Feel free to donate some LTC @ **LVwmwxuwwAaMYSPgogdbShzChsTue4rPbK** if you found this usefull :)

Please share by linking to this page maybe someone will be willing to contribute some code





# SetUp
In your GoogleSpreadsheet on clean sheet go to:

Tools -> Script Editor

Create new script

Paste contents of gscoinex.gs to script editor and save

Change timezone used in script if you wish

Allow all permissions google asks for

On clean spreadsheet, you will see now in Menu new button GSCoinEX, click on it and pick Update

This will create a status indicator in first row (this is needed to issue updates and autorefresh function)

Once status indicator has been created the auto-refresh and update will make changes only in sheet where this indicator is placed, therefore you can leave auto-refresh on and work on other sheets that can link prices from it




# Usage

You can fetch couple tickers data by insterting following functions into formula in your sheet's cells

### =getBitBay("From";"To";"typeOfTicker")

### =getBitMarket("From";"To";"typeOfTicker")

### =getPoloniex("From";"To";"typeOfTicker")

Where From and To is currency pair like BTC and PLN and typeOfTicker is one of following types:



## Types supported by all exchanges:

last - last price on currency pair

ask - highest current ask price

bid - lowest current bid price

low - lowest price point in last 24hr

high - highest price point in last 24hr

volume - volume of currency traded on exchange

% - special type created by me in all exchanges, shows percentage representation of last price in low - high range

#### You can also put in types specific to certain exchange like "percentageChange" in Poloniex, all types exchanges are returning through public API can be accessed this way, refer to respective exchange API docs for those specific types




# Examples
=getBitBay("BTC";"PLN";"last") # last price of BTC/PLN pair on BitBay

=getPoloniex("BTC";"USDT";"ask") # current ask price of BTC/USDT on Poloniex

=getBitMarket(A2;"PLN";"high") # highest price of whatever you have in A2/PLN pair on BitMarket

.... and so on



# Disclaimer

   This program is free software; you can redistribute it and/or modify
   
   it under the terms of the GNU General Public License as published by
   
   the Free Software Foundation; either version 3 of the License, or
   
   (at your option) any later version.
   
   
   
   This program is distributed in the hope that it will be useful,
   
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   
   GNU General Public License for more details.
