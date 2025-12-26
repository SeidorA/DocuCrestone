---
title : "Connections"
"label": "Connections"
iconName: "cube"
description: "Create connections to connect your data to Crestone."
---
import {SourceList, Destinationlist, CardList} from './list.tsx';
import {Titleicon} from '../../cards/cards.tsx'


## Available Connection Types in Crestone



Crestone supports a flexible and scalable connection model that allows seamless integration between SAP systems and modern data platforms.

To get started, make sure you have the necessary credentials for both the source and destination. Follow the steps below to set up your connections:
<p align="center">
![Sources and Destinations](/img/old/star/conection.gif)
</p>

Below is an overview of the supported Sources (data providers) and Destinations (data targets), each designed to fit specific data movement and processing scenarios.

<Titleicon icon="planeDeparture"> 
    ## Source Connections
</ Titleicon>

<SourceList/>

<Titleicon icon="planeArrival" >
    ## Destinations Connections
</ Titleicon>
<Destinationlist/>


<Titleicon icon="bolt" >
    ## Rapid deployment
</ Titleicon>
<CardList />
