import { useState, useEffect } from "react";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import magicIcon from "../images/magic.gif";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import loading2 from "react-useanimations/lib/loading2";
import ProductsBox from "./ProductsBox";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const data = [
  {
    position: 1,
    title: "Espresso Coffee Machine",
    link: "https://www.aajjo.com/tea-coffee-machine/espresso-coffee-machine-5/product",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRHoVDlsT0UJcQUm478S6hgsOSehXwIwqAWx-6Q9jgsvbgymVsyi3bJMNo35oAzrUlDVDCHXmSyexALpPdbeq83F8iEqhUK&usqp=CAE",
    source: "Aajjo.com",
    price: "₹6,000.00",
    extracted_price: 6000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9128035710920416146",
    product_id: "9128035710920416146",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9128035710920416146",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 2,
    title: "Nescafe coffee Machine",
    link: "https://www.aajjo.com/vending-machines-dispensers/nescafe-coffee-machine-aristo-enterprises/product",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSev8X_M081-VHr85YxRIW_nYG2NK06t-WANEQ0NwMnZeTKZAbZYR69REpq8GaoGZk0z0HY4w_T3YWPhv9770yW-mXPru51_XuiqzTnRYkl1hMZkAfFZa5z&usqp=CAE",
    source: "Aajjo.com",
    price: "₹15,000.00",
    extracted_price: 15000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:14286237378658302900",
    product_id: "14286237378658302900",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=14286237378658302900",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 3,
    title:
      "Morphy Richards New Europa 800 Watts Espresso and Cappuccino 4-Cup Coffee Maker, Black",
    link: "https://www.amazon.in/Morphy-Richards-Europa-Espresso-Cappuccino/dp/B008P7IF02?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=AXOGFIT0PZZ7G",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSXmYs8YzTKQY0I0P3BWnkhBcWar6_DLGR5yBREs7SMQNtMhMM57Kp6TEoQohVnqzQ-m6SetbdZ5gaTqgKsvSpkNtl8Yidx9NJK7md7likzJ-FCTzf64QN1&usqp=CAE",
    product_id: "7239989391657925123",
    source: "Amazon.in",
    price: "₹4,399.00",
    extracted_price: 4399.0,
    number_of_comparisons: "4",
    comparison_link:
      "https://www.google.com/shopping/product/7239989391657925123/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:7239989391657925123,cs:1,eto:18194394995575476711_0,pid:18306615528439714047",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A7239989391657925123%2Ccs%3A1%2Ceto%3A18194394995575476711_0%2Cpid%3A18306615528439714047&gl=in&hl=en&num=100&offers=1&product_id=7239989391657925123",
    product_link:
      "https://www.google.com/shopping/product/7239989391657925123?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7239989391657925123",
    delivery: "Free delivery",
    extensions: ["With Steam Wand"],
  },
  {
    position: 4,
    title: "Black & Decker DCM25-IN 330-Watt 1-Cup Coffee Maker",
    link: "https://www.myinstamojo.com/shopping_feed/product/redirect/SF570a753cd4Q3342566/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmiFjDQyyfBkjbv1o8cfOxlnIjRrqs4BjVkqGhiT27Qr3ogbFa38J8lAHNGk0dcH-aYILWhk_IsCA9rUzWnaOV6rhZvgGfKuZi54v0IfaqqgpHxKl1WHTS&usqp=CAE",
    product_id: "9031128122806909816",
    rating: 3.0,
    reviews: 2,
    source: "Tapchhak Appliances",
    price: "₹1,995.00",
    extracted_price: 1995.0,
    number_of_comparisons: "2",
    comparison_link:
      "https://www.google.com/shopping/product/9031128122806909816/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:9031128122806909816,cs:1,eto:10977693513365432476_0,pid:4815911142017696952,rsk:PC_6387626071771930115",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A9031128122806909816%2Ccs%3A1%2Ceto%3A10977693513365432476_0%2Cpid%3A4815911142017696952%2Crsk%3APC_6387626071771930115&gl=in&hl=en&num=100&offers=1&product_id=9031128122806909816",
    product_link:
      "https://www.google.com/shopping/product/9031128122806909816?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9031128122806909816",
    delivery: "₹385.00 delivery by Wed, 6 Dec",
  },
  {
    position: 5,
    title: "Heavy Duty 18 inch Electric and Gas Indian Coffee Machine",
    link: "https://www.toolsvilla.com/18-inch-indian-coffee-machine?srsltid=AfmBOor1sLfrZ9GQ0GukjPB8xq5rxnl6Sktk7T_SBW_gzPuqg6MqQ-njX8c",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8PwYedSR1UHdZI8ww0r2j8XW_94_1GPsvDw8oG5gmjQSPRkdVMk2MS-VHH8ruvCv_dUy2yEQLZwBQvTm39VFr0MJIpAiIzQnTFfOD2FmdjqMmRf3D3excfA&usqp=CAE",
    source: "Toolsvilla",
    price: "₹15,099.00",
    extracted_price: 15099.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:10116652072986112452",
    product_id: "10116652072986112452",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=10116652072986112452",
    delivery: "Free delivery by Thu, 9 Nov",
    extensions: ["Semi Automatic"],
  },
  {
    position: 6,
    title: "NESCAFE E' smart Personal Coffee Maker",
    link: "https://www.croma.com/nestle-e-smart-600-watt-1-cups-automatic-flat-white-lungo-creamy-iced-espresso-cappuccino-latte-coffee-maker-with-leak-spill-proof-black-/p/215068?srsltid=AfmBOopMBuSyVhK5ehIfUWB2y47CrAtQDWmzFeyodYS61-dDfCoT4slzt4g",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRu7GKCG1NUIeyjdsHFedyoS7eN79BaKRAggxZoLfKmhGvilXtKFG8a8a1OlSdQD0c0ARZleRScULd7dLcoTpsQo9CR0Qp33HpRwJM60PefjkC-S_oKpm4Lqw&usqp=CAE",
    product_id: "9496866499886886573",
    rating: 3.3,
    reviews: 7,
    source: "Croma",
    price: "₹6,019.00",
    extracted_price: 6019.0,
    number_of_comparisons: "3",
    comparison_link:
      "https://www.google.com/shopping/product/9496866499886886573/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:9496866499886886573,cs:1,eto:6405262442316686014_0,pid:17377692707158504518,rsk:PC_16066614367270406106",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A9496866499886886573%2Ccs%3A1%2Ceto%3A6405262442316686014_0%2Cpid%3A17377692707158504518%2Crsk%3APC_16066614367270406106&gl=in&hl=en&num=100&offers=1&product_id=9496866499886886573",
    product_link:
      "https://www.google.com/shopping/product/9496866499886886573?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9496866499886886573",
    delivery: "Free delivery by Wed, 8 Nov",
    extensions: ["Automatic", "With Steam Wand"],
  },
  {
    position: 7,
    title: "Electric and Gas Indian Coffee Machine 21 inch",
    link: "https://rojgarbox.com/products/electric-and-gas-indian-coffee-machine-21-inch?variant=43429738447061&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOor3aojrXXQ8Al53AO3MIcvj2m5dEWxN37lUX5TLcOvJxJvp4MKBcCM",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT0uiQViCz5m6vsc7W2MBzTfzV3c9mVMbItlOz257sBXqSUU5iSBJwo3mOxytCHsYdQHxdHXpjZQl7g8f0JBPDyPxkYQ2SFp5HkKPMlW340ZNTZ_bzwrtsJ&usqp=CAE",
    source: "rojgarbox",
    price: "₹15,500.00",
    extracted_price: 15500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:11728044606530335906",
    product_id: "11728044606530335906",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=11728044606530335906",
    delivery: "Free delivery by Wed, 15 Nov · Free 3-day returns",
  },
  {
    position: 8,
    title: "Bru Coffee Maker Machine",
    link: "https://www.tradeindia.com/products/bru-coffee-maker-machine-4196294.html",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRWESc-eH0hm2j1wBSn4myazKIWRtexfKx5XsXWUTq9TwERK4kq2DFmrmoMlKZxDZ5GoAvSGKw11bvRAIw-QQLce3yiyWKY9ZhHsspv0Vpte4gsH5g8fJiP&usqp=CAE",
    source: "Tradeindia.com",
    price: "₹10,000.00",
    extracted_price: 10000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:7780210965628904509",
    product_id: "7780210965628904509",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7780210965628904509",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 9,
    title: "Coffee machine 2 lane",
    link: "https://www.aajjo.com/tea-coffee-machine/coffee-machine-2-lane/product",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQKgbO9uIg5xyEQw4kL4AIu6VHLBCrivOSu8mm3xNSSyP-TZgFXLb8ODYK8aVaJ6Ie4P4OPoF9jrMZtTwg5JZqzv1-g71bbR-bnfF0vqOnqczsoE-B7bEWIrw&usqp=CAE",
    source: "Aajjo.com",
    price: "₹15,000.00",
    extracted_price: 15000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:2587937699138967831",
    product_id: "2587937699138967831",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=2587937699138967831",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 10,
    title: "Wonderchef Black Regalia Espresso Coffee Maker 15 Bar 850 W",
    link: "http://www.myntra.com/Coffee-Maker/Wonderchef/Wonderchef-Black-Regalia-Espresso-Coffee-Maker-15-Bar-850-W/19314426/buy",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRSNKPdO0hiJvy0boY-2a_Z4fH2_FAvjGDxATgfReXBiFHXr6bPbfRzFAwE8njjvfxqWsDYX50P-37aliIhyDQ1pT_zcXMKL3B-GTDRUNDQXveUG482iia0oA&usqp=CAE",
    source: "Myntra",
    price: "₹9,999.00",
    extracted_price: 9999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:3443098027020333631",
    product_id: "3443098027020333631",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=3443098027020333631",
    delivery: "Free delivery by Wed, 15 Nov",
  },
  {
    position: 11,
    title: "Ideal Coffee Machine Double Group",
    link: "https://www.kamlaenterprises.net/products/ideal-coffee-machine-double-group/632502000012781001?srsltid=AfmBOoohlPDzKyTIRs02d6_kW8-hmw1ktDLg-ov03HfTk4D4AP0rw7iOULo",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR96SMLbd1sp-bJHLfocKOcYpCRBFBItwXlPMoGTulZiF7c2F8ox2E3QczZZRqix2kIu2Cw-3sDuamhPqluNGayEksG5x7nbQO0g7ejXF4&usqp=CAE",
    source: "Kamla Enterprises",
    price: "₹1.00",
    extracted_price: 1.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:18258019339720175408",
    product_id: "18258019339720175408",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=18258019339720175408",
    delivery: "₹100.00 delivery by Thu, 23 Nov",
  },
  {
    position: 12,
    title: "Siberian Coffee Machine",
    link: "https://www.tradeindia.com/products/siberian-coffee-machine-c7271397.html",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT7DbdS7CFBZWAq6ogGIUXVnkZqrBwpxLSLD4gUw8Ld7HtllDuXy9cJxy6vAr_zLv7GL1XjvXfLOt0agIUCXqGLUyEw8dlEO1f6pXZDTrd25cFC1Xov976TXg&usqp=CAE",
    source: "Tradeindia.com",
    price: "₹6,000.00",
    extracted_price: 6000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:1180088987437572317",
    product_id: "1180088987437572317",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=1180088987437572317",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 13,
    title: "Morphy Richards Fresco Coffee Maker Black",
    link: "https://www.kitchenbrandstore.com/product/morphy-richards-fresco-800-watt-4-cups-espresso-coffee-maker-black?srsltid=AfmBOoogUcxYoQqA4tqwqNOHzhkCWIwZp51qAucuHqSHy8t2Lfq0dWMpoSs",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRJWLCt1Kpg8-RV07_A4afkwTgo3b6t28n7bUIfkAliOtwvGAGC6pUrQHSa-ESP-W3bUsyxWhlpqJ_SsNvw9dcjyLreiEtwlrvPZLbXp_2qiXrNJ9anjA6krQ&usqp=CAE",
    product_id: "7960355072674257195",
    source: "Kitchen Brand Store",
    price: "₹4,799.00",
    extracted_price: 4799.0,
    number_of_comparisons: "5+",
    comparison_link:
      "https://www.google.com/shopping/product/7960355072674257195/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:7960355072674257195,cs:1,eto:10350438104779635517_0,pid:1343884169013864249",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A7960355072674257195%2Ccs%3A1%2Ceto%3A10350438104779635517_0%2Cpid%3A1343884169013864249&gl=in&hl=en&num=100&offers=1&product_id=7960355072674257195",
    product_link:
      "https://www.google.com/shopping/product/7960355072674257195?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7960355072674257195",
    delivery: "Free delivery by Mon, 13 Nov · Free 15-day returns",
    extensions: ["With Steam Wand"],
  },
  {
    position: 14,
    title: "DELONGHI BCO420 1750-Watt Pump and Drip Coffee Maker",
    link: "https://eziona.com/products/delonghi-combi-pump-espresso-filter-coffee-maker?variant=41500909142167&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOooOI6x95Egji0msDLsCsoo9s7InRkflHdfkPO1l39oIIUPuNA3x9EY",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTFGBnKedcSrrGlRQwf5L1LpVyEs9m9QjZbnb8vq-p-gk3b2N3dd-PUO09aED082HgQFrbmY3J0E-jNNGoyxxVocIhFRa_iyyWga5-HeoiF-ry7UKw0HYVLaQ&usqp=CAE",
    product_id: "10462941701773707833",
    rating: 4.1,
    reviews: 254,
    source: "Eziona",
    price: "₹30,490.00",
    extracted_price: 30490.0,
    number_of_comparisons: "3",
    comparison_link:
      "https://www.google.com/shopping/product/10462941701773707833/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:10462941701773707833,cs:1,eto:16104126264576228796_0,pid:12901565228165398792,rsk:PC_6951940209017657972",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A10462941701773707833%2Ccs%3A1%2Ceto%3A16104126264576228796_0%2Cpid%3A12901565228165398792%2Crsk%3APC_6951940209017657972&gl=in&hl=en&num=100&offers=1&product_id=10462941701773707833",
    product_link:
      "https://www.google.com/shopping/product/10462941701773707833?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=10462941701773707833",
    delivery: "Free delivery by Wed, 15 Nov",
    extensions: [
      "Semi Automatic",
      "Pump",
      "With Steam Wand",
      "With Grinder",
      "Pod Compatible",
      "Silver/Black",
    ],
  },
  {
    position: 15,
    title:
      "Budan 1450 Watt 10 Cups Semi-Automatic Espresso, Cappuccino & Latte Coffee Maker with Timer Display (Silver)",
    link: "https://www.amazon.in/Budan-Espresso-Machine-warranty-EM101/dp/B095TKYTYW?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1ARORGL9FW6LS",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR9SUqdR06R8N04OyQKX4msI4eF_kLka2WJuLn643pCmS94N819YZs_BqFR0tlGmYgvCu7Avexjm3FWsszChinTdzUAwe9SJdhI0tpMajk&usqp=CAE",
    product_id: "15157436417761425008",
    source: "Amazon.in",
    price: "₹24,999.00",
    extracted_price: 24999.0,
    product_link:
      "https://www.google.com/shopping/product/15157436417761425008?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15157436417761425008",
    delivery: "Free delivery",
    extensions: ["Semi Automatic", "Pump", "With Steam Wand"],
  },
  {
    position: 16,
    title: "Commercial 24 inch Electric and Gas Indian Coffee Machine",
    link: "https://www.toolsvilla.com/24-inch-indian-coffee-machine?srsltid=AfmBOoqeUSFFx36FzD73CxAlogcVh5ggOAX0L_YERp4ydhoql_IXrrgrgWI",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRfm1OI3bU9k1s-Y-FLmoDyGguAJVgI0GmS47TSq__cDJ9rg0oIzppDoim-fJ1X2jxIBA11_9vnv9MtBKHyxsY-PB4gDLKlLvQal9Sa-uPQlmcnjdYQrXu4&usqp=CAE",
    source: "Toolsvilla",
    price: "₹20,099.00",
    extracted_price: 20099.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15242426013051662499",
    product_id: "15242426013051662499",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15242426013051662499",
    delivery: "Free delivery by Thu, 9 Nov",
    extensions: ["Semi Automatic"],
  },
  {
    position: 17,
    title: "Caffeina Semi-Automatic Espresso Coffee Machine",
    link: "https://www.aajjo.com/tea-coffee-machine/caffeina-semi-automatic-espresso-coffee-machine-in-jaipur-caffeina-vending-solution/product",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQO5HXYUqGf8220dv_jbbpkgN2d7Hbm3qz9P5l0cKzsruvApwxb-tEXwSoBurpb_0fgypMxetijZOHF8Girn3SEAUVbn4J57UWhJ-80TfEFZyO4Mv_WlK5D&usqp=CAE",
    source: "Aajjo.com",
    price: "₹13,500.00",
    extracted_price: 13500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9021847341748176955",
    product_id: "9021847341748176955",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9021847341748176955",
    delivery: "Delivery date and cost shown at checkout",
    extensions: ["Semi Automatic"],
  },
  {
    position: 18,
    title: "Morphy Richards Kaffeto 1350 W Milk Frother and Coffee Maker",
    link: "https://detec.in/products/morphy-richards-kaffeto-1350-w-milk-frother-and-coffee-maker?variant=40862691229851&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoo1qB8z5V1waJZN7E310E_iKXyF41ULSjJoBNZgITl1E0TMw5keL48",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpq2XeMtYRsrs5jXH6q5_PE2Vb--pUa_blbPzXxIahGm1gcrFp_zUYkzzSqMUp8zydy_oS0gjKQGXHLWftocl6iFY_rSnEpXsMLwpAUbE8UOiHe-A0jzqK&usqp=CAE",
    product_id: "16194816650657394012",
    source: "detec.in",
    price: "₹17,995.00",
    extracted_price: 17995.0,
    number_of_comparisons: "5+",
    comparison_link:
      "https://www.google.com/shopping/product/16194816650657394012/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:16194816650657394012,cs:1,eto:5200953312913429804_0,pid:8599107271191211523",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A16194816650657394012%2Ccs%3A1%2Ceto%3A5200953312913429804_0%2Cpid%3A8599107271191211523&gl=in&hl=en&num=100&offers=1&product_id=16194816650657394012",
    product_link:
      "https://www.google.com/shopping/product/16194816650657394012?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=16194816650657394012",
    delivery: "Free delivery by Wed, 15 Nov · Free 10-day returns",
    extensions: ["With Steam Wand"],
  },
  {
    position: 19,
    title:
      "Toolsvelly Heavy Duty 20 inch Electric and Gas Operated Indian Coffee Machine",
    link: "https://www.industrybuying.com/canteen-appliances-toolsvelly-MAC.CAN.320291172/?srsltid=AfmBOoojT57XnwDdqvNVqonLyBA-Le7U6r9nlmPoYg88zLqMq6QNbmkDVa4",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsB622qswzYz6Hves3atu7wZW9TVh-evfdw-tNoXQW6038Y9X2narpGEqKw7e5WukhtwjooLWEIy-5FiR0XOLyUPZf9gA9h48A9MyRK3Z0qtmStm8ARYdr&usqp=CAE",
    source: "IndustryBuying",
    price: "₹15,800.00",
    extracted_price: 15800.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:1604326376823451438",
    product_id: "1604326376823451438",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=1604326376823451438",
    delivery: "Free delivery by Wed, 15 Nov",
  },
  {
    position: 20,
    title:
      "Singer Xpress Brew 800 Watts Coffee Maker - 4 Cups Espresso/Coffee Capacity Carafe",
    link: "https://www.amazon.in/Singer-Xpress-Watts-Coffee-Maker/dp/B07K1Y2B61?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2MTUGD8XKAQL0",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRqGIiuH7FpaaHDI5uKhjw-oEzFGSHrR4-dVQDjgwYLNTrHFw3j6ny8rymRt-JCgul6kYsCCprq2imVKbCwduAk38WtBH40T5gR1NFE5PspSEHxwNqgXjtNow&usqp=CAE",
    product_id: "7733224938446244811",
    source: "Amazon.in",
    price: "₹3,999.00",
    extracted_price: 3999.0,
    product_link:
      "https://www.google.com/shopping/product/7733224938446244811?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7733224938446244811",
    delivery: "Free delivery",
  },
  {
    position: 21,
    title: "COFFEE MACHINE",
    link: "https://srcommercialhotelequipments.co.in/product/30172355/COFFEE-MACHINE?utm_source=GMC",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRLgpW1DjcgjycMlw6E8u9tbR1uZDjsRK-NiLP9BNU7kjB2k-LMa4L034b-i4mKgzOgPBiqsL7ifRCS6YePVIkOlC4db2nX-iKrZtMHacKp1FtmriwbSnL9Aw&usqp=CAE",
    source: "srcommercialhotelequipments.co.in",
    price: "₹15,500.00",
    extracted_price: 15500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:1631224725970196700",
    product_id: "1631224725970196700",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=1631224725970196700",
    delivery: "₹400.00 delivery by Thu, 9 Nov",
  },
  {
    position: 22,
    title:
      "3D model Coffee Maker Espresso M1 Electronic Home Appliances > Small Home Appliances > Coffee Makers and Coffee Grinders",
    link: "https://greatcatalog.net/en/no-brand-m12856.html?srsltid=AfmBOorgXSaOsrHQFkGoK0Je9trs99JKTTl7uzO6HtHekYMNZYJHKpwD7sw",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR1P9ClV8N9XYyqxv8R0pXA7cGHvOsXY4gYcFiQtZEHzlUP6lXgh8ai6NEWGnHk0ylEM6kf95Di4gfINOVXAyx2nbo7OQTe4DCXWEM-d_fEAWNuQ9cBo4rAHA&usqp=CAE",
    source: "Great Catalog",
    price: "₹582.84 + tax",
    extracted_price: 582.84,
    alternative_price: {
      price: "$7.00 + tax",
      extracted_price: 7.0,
      currency: "USD",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:5208770303325379550",
    product_id: "5208770303325379550",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=5208770303325379550",
    delivery: "Free delivery by tomorrow",
    extensions: ["Blade", "Electric"],
  },
  {
    position: 23,
    title:
      "KIING Espresso Coffee Machine 14 inch Capacity 4 Liter 150 Cups at a time for Shops & Banquet Halls",
    link: "https://www.amazon.in/KIING-Espresso-Machine-14-Capacity/dp/B09H371KTV?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=AFO64RAHYT6H0",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTOrzvt7bMw8RMUAEKwDWwI_h02STNPCS0Cbsw_IfxPjUNkvnTry94DWhbqr35wQiNFn-x46S3GhBDz83AmX03QyWSkYQYKSeoX8bWqLJDi4ERSeKJN6NC9&usqp=CAE",
    source: "Amazon.in",
    price: "₹9,920.00",
    extracted_price: 9920.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13005547812664306680",
    product_id: "13005547812664306680",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13005547812664306680",
    delivery: "₹50.00 delivery",
  },
  {
    position: 24,
    title:
      "Espresso Coffee Maker - Cappuccino Maker - Coffee Machine - 1 Year Warranty",
    link: "https://clearlineappliances.com/products/espresso-bar?variant=566295485&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorTQcLPX3YQRDVi6j0RWR2yR_U-c-C9GeKARZ5IAEGjUS6kqrmHPiE",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQA569uySOJlNpjVN3zlj_ylqOykWidnjHeocjAw_wFlnHN-Pu1DhNNrfnTUNozt2-BNNojBbZBfBwSBseWFDndcP6Rf9GHqRJnRHDh2jU&usqp=CAE",
    source: "clearlineappliances.com",
    price: "₹4,295.00",
    extracted_price: 4295.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9597878116481032107",
    product_id: "9597878116481032107",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9597878116481032107",
    delivery: "Free delivery by Thu, 23 Nov · Free 30-day returns",
  },
  {
    position: 25,
    title: "Heavy Duty 20 inch Electric and Gas Indian Coffee Machine",
    link: "https://www.toolsvilla.com/20-inch-indian-coffee-machine?srsltid=AfmBOooQMu-v09NJ0C0Ms3xLNE6DeK4iPffCXpE-S55bV7gMEaTvtKCsi8M",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSbebHTR4rcUTr0JCY30zwkQfwLuSKD2wzR1026qyzAQxVhw2Ksqlof6zAXY15OZPenPqGuuxW9oYMbYK--uekrajUHL1D8JmlAXZcH35yO1I8yuu2zdGVZvg&usqp=CAE",
    source: "Toolsvilla",
    price: "₹17,270.00",
    extracted_price: 17270.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:1158847498232504540",
    product_id: "1158847498232504540",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=1158847498232504540",
    delivery: "Free delivery by Thu, 9 Nov",
    extensions: ["Semi Automatic"],
  },
  {
    position: 26,
    title: "Cafematic 8 Office Coffee Machine",
    link: "https://in.jebelz.com/in/cafematic-8-office-coffee-machine.html",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRMj8PrZ6Jw40M1XSOiRh5f38UHCZkQJMLSOe4yA34MuIT9cO0YesmloayCtF0xGgXtQu_-pBk-XDKTHoh_SbtGX0JTYCtydaZ83doAIVomVD-W3-Y2boW7_w&usqp=CAE",
    source: "Jebelz India",
    price: "₹7,63,176.96",
    extracted_price: 763176.96,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:2598510032750037280",
    product_id: "2598510032750037280",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=2598510032750037280",
    delivery: "Free delivery · Free 10-day returns",
  },
  {
    position: 27,
    title:
      "Wonderchef Black Regalia Coffee Capsule Machine 1400 WattRegalia Coffee Capsule Machine 1400 Watt",
    link: "http://www.myntra.com/Coffee-Maker/Wonderchef/Wonderchef-Black-Regalia-Coffee-Capsule-Machine-1400-WattRegalia-Coffee-Capsule-Machine-1400-Watt/19467356/buy",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-oYv8aurMie0hYtdB-XF3DcWfdKkK1QrXf2Fma14t0LQT6WP_cMyj6Z0xvZ_Nf1udGyrMzdmSfW6kwhm2MLFb-WKPWL1Cussszj5zsHuJcavkwNggON47&usqp=CAE",
    source: "Myntra",
    price: "₹9,999.00",
    extracted_price: 9999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:2865463783851613876",
    product_id: "2865463783851613876",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=2865463783851613876",
    delivery: "Free delivery by Wed, 15 Nov",
    extensions: ["Automatic", "Pod Compatible"],
  },
  {
    position: 28,
    title: "Automatic Coffee And Tea Machines",
    link: "https://www.tradeindia.com/products/automatic-coffee-and-tea-machines-5636502.html",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRi-nFLAw4AE0hHE4cKhzZ_uLRKtbkU5jUM7FRjrDjw6Q704YY1VOmz0GjsZcdsiuCP_j6n7qnvp1byvD6NksAIZqw3kEDGAEL_Nm4HbM6aeG9sK1MH4tLD&usqp=CAE",
    source: "Tradeindia.com",
    price: "₹17,000.00",
    extracted_price: 17000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9036257511942644576",
    product_id: "9036257511942644576",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9036257511942644576",
    delivery: "Delivery date and cost shown at checkout",
    extensions: ["Automatic"],
  },
  {
    position: 29,
    title:
      "Coffee Makers - Budan Solo Steamer Espresso Machine (Black) - Pepperfry",
    link: "https://www.pepperfry.com/product/budan-solo-steamer-espresso-machine-black-2092818.html",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmYz2DuZ5zwTw2ZV3-RyRM-rY_j24M8oKYE4K_6ABlZ-5kc-SgGElTg9ftqDAqvi6rBn2_rO1x4P_cnZRSu1fX-QIkBB2cCsKz1a2MwbhC&usqp=CAE",
    source: "Pepperfry",
    price: "₹4,499.00",
    extracted_price: 4499.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:7103087641140903845",
    product_id: "7103087641140903845",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7103087641140903845",
    delivery: "Delivery date and cost shown at checkout · Free 14-day returns",
  },
  {
    position: 30,
    title: "Coffee Machine Small Auto",
    link: "https://www.kamlaenterprises.net/products/coffee-machine-small-auto/632502000000227028?srsltid=AfmBOop_JLo4GkLxXCTqAUdW9ijl78FHFW1AyKi5xYUjbY3Gtg_ubSOnZtQ",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ_GySmTDEv2l1Ibvf2NErY_oU7NmHEOn4Fc9741v8knl1rYjY64U7m5Zzi15uehlRjIZGXk1Mxv8vo4xtl28D8Z-WA5umqX8pMAQr6t6syMgIPWQ9bgG3b6A&usqp=CAE",
    source: "Kamla Enterprises",
    price: "₹11,500.00",
    extracted_price: 11500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:12376763283977591750",
    product_id: "12376763283977591750",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=12376763283977591750",
    delivery: "₹2,000.00 delivery by Thu, 23 Nov",
  },
  {
    position: 31,
    title:
      "PRINGLE JAVA Espresso Coffee Maker, Coffee Machine, 15 Bars, Frother Wand for Espresso, Cappuccino, Steam Espresso Maker For Home, Adjustable Milk",
    link: "https://www.amazon.in/PRINGLE-JAVA-Cappuccino-Adjustable-Temperature/dp/B0CKLJK3ZW?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A3Q0U665HRY14V",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSmf80HJ_S5ipnRYkTixFUzfNxjuVKH_U6NZqzeeVsbWtAGhoMH82vsyvwvPko3Pef43HOP8mnqKMSfjGpsgwl-ypk2TyTaQ7-9zQ6hv6FeL5tO49_H2VDxsQ&usqp=CAE",
    source: "Amazon.in",
    price: "₹8,499.00",
    extracted_price: 8499.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:18052494459332156808",
    product_id: "18052494459332156808",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=18052494459332156808",
    delivery: "Free delivery",
    extensions: ["Steam Powered", "With Steam Wand"],
  },
  {
    position: 32,
    title: "Wonderchef regalia espresso coffee maker 15 bar",
    link: "https://wizekart.com/kitchen-appliances/4142-wonderchef-regalia-espresso-coffee-maker-15-bar.html?srsltid=AfmBOooL3NRe6aTLMl_zMr1t1Wedg0Hs-TXpA_XoLIX6y-o0xVEJqI7Fz8w",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTOG3Yphc19noK1l-napj4yQpDYHYtaUpCF489GlycdUhaoUPBbe0j5gsliW9bo4M-oJTOQMszzKkmLRVrIJ2x0PG2f2AStkuHOvRCO1lYDsaKAUc58Q-hl_g&usqp=CAE",
    source: "WizeKart",
    price: "₹11,999.00",
    extracted_price: 11999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:14902914249745605369",
    product_id: "14902914249745605369",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=14902914249745605369",
    delivery: "Free delivery by Tue, 7 Nov · Free 15-day returns",
  },
  {
    position: 33,
    title: "Russell Hobbs Espresso Machine",
    link: "https://www.croma.com/russell-hobbs-800-watt-4-cups-manual-espresso-coffee-maker-with-non-drip-valve-black-/p/197752?srsltid=AfmBOop7dVVjTg4btsP9FuSgf50Y3gas04k8H0CPnrjK9mf1XyKP-voFdZ4",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQUtTuH6EP-C4Ho6Eq9HgaawDp1bWuEHDYK6Zw5htwteHjd-4dDoBy7zdsMKqNdI1SmkCSWzOjEVtD87iXCxexlwO8LZ38dhW53UeeViq2OI2HIGv4yw4guDg&usqp=CAE",
    product_id: "17149665004465908997",
    source: "Croma",
    price: "₹4,995.00",
    extracted_price: 4995.0,
    product_link:
      "https://www.google.com/shopping/product/17149665004465908997?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=17149665004465908997",
    delivery: "Free delivery by Wed, 8 Nov",
    extensions: ["Manual", "With Steam Wand"],
  },
  {
    position: 34,
    title: "Coffee Machine Expresso 13 Inch",
    link: "https://rojgarbox.com/products/coffee-machine-for-shopping-stores-13-inch?variant=43429224251605&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoob90QidCJYoSITc8GRhW0AWTAQVT3aKIpj5dPET53s15sbunXeoGM",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSwUfKpLN1ZS-r0vJzUL_whO1DoXAj6tUpA_iqs4K3RVNA0-5HdlhsiY9QpG-4FqMjCtOO9xUK-1V1V5R8EtHmWLrVCD-e6kT6K81onOX9sqe2EbS6aNugQptE&usqp=CAE",
    source: "rojgarbox",
    price: "₹9,200.00",
    extracted_price: 9200.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:12256480791783800533",
    product_id: "12256480791783800533",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=12256480791783800533",
    delivery: "Free delivery by Wed, 15 Nov · Free 3-day returns",
  },
  {
    position: 35,
    title: "Espresso Coffee Making Machines",
    link: "https://www.aajjo.com/tea-coffee-machine/espresso-coffee-making-machines/product",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQAYi9s_z8yEaCfrUOT-dGGNxTCTBnMsjHlrlmvv1rEEK9-Qn3k73NmmGuqXX4YamyotAP7WbpIURLrwu4irkQDtAWB1SbL4Q&usqp=CAE",
    source: "Aajjo.com",
    price: "₹17,500.00",
    extracted_price: 17500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15439215958103059579",
    product_id: "15439215958103059579",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15439215958103059579",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 36,
    title: "Xiaomi SCISHARE Capsule Espresso Coffee Machine",
    link: "https://furper.com/products/xiaomi-scishare-capsule-espresso-coffee-machine?variant=9052395831340&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqsNUYtWIreCPmYEwRth1F6HIec_yiPEnvGNit5SXUgZ3S2iXiGfgo",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBUDR8o7ilNjdwXbqVF6pAOZP2bWexS6KzECztdecqg35LZGk-9lg5g_eYTA4QsyJ-T8vwe9FktI9EBdkUS83FmdoWr1VpAczFYJq7BazgDmxuByoHBiSiDQ&usqp=CAE",
    product_id: "760798695769377413",
    source: "Furper India",
    price: "₹17,999.00",
    extracted_price: 17999.0,
    product_link:
      "https://www.google.com/shopping/product/760798695769377413?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=760798695769377413",
    delivery: "Free delivery by Wed, 15 Nov · Free 10-day returns",
    extensions: ["Automatic", "Pod Compatible"],
  },
  {
    position: 37,
    title: "Black + Decker BXCM0401IN 4-Cup Espresso & Cappuccino Coffee Maker",
    link: "https://easy-buy.in/product/black-decker-bxcm0401in-4-cup-espresso-cappuccino-coffee-maker/?srsltid=AfmBOoo4W7AQU4jeo5D6J9SZaECnwCkDhGsfF6Q8UrLBRzDxR43ztrmDjyU",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS_yHNNeYJ8HOF0Zr8sFIKjMfxnCQ8QVoQKGEF53LjazF2tjs7MGnYHQ7be5P9m11AOucW1glwWyNNt_hqfEeGYwJvWoH0itFo5Zo--ELkA86GdqUSLKq9hNjc&usqp=CAE",
    source: "easy-buy.in",
    price: "₹5,499.00",
    extracted_price: 5499.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:12018547708976075462",
    product_id: "12018547708976075462",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=12018547708976075462",
    delivery: "Free delivery by Thu, 9 Nov · Free 7-day returns",
  },
  {
    position: 38,
    title: "2 Option Tea & Coffee Machine",
    link: "https://cafedesireonline.in/products/cafe-desire-coffee-machine-2-lane?variant=31361657700490&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOopg_yoeIeLLUNwy6ZDP_1DDAIcM2e3k8FdQqfxiRWjbALvP2IDlZF4",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQuHs9duwvNFard8TQiO5OBZ9hWFH-zv_vU1t9OEMHS2anlc00s2-bBQgnawbZy0R76J5jw92N3Qh-Qppv9lnGglfHfKLTgh47WzJKOn22IFlsukF8WbW9ELQ&usqp=CAE",
    source: "Cafe Desire",
    price: "₹15,900.00",
    extracted_price: 15900.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15566860468599829319",
    product_id: "15566860468599829319",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15566860468599829319",
    delivery: "Free delivery by Wed, 15 Nov",
  },
  {
    position: 39,
    title: "My Espressino - Home Espresso Coffee Machine",
    link: "https://kcroasters.com/products/my-espressino-home-espresso-coffee-machine?variant=37796558733512&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqrGKEJNktVV8HkI78_2p4zUQUzVTXgyGRa2njckxFpXHnyXCpBQ5s",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTXfhPapLmADvvcQVwDzok_FXNTtb1hr8tulBznHYxAoqcINy3JLXuHWaROE6muptEOGxoC9uuVweqxXllsOxbTXS5onLTHW-4FJQNvIalnzZhBjGBCKrVq&usqp=CAE",
    source: "Koinonia Coffee Roasters",
    price: "₹35,400.00",
    extracted_price: 35400.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:865974345822706221",
    product_id: "865974345822706221",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=865974345822706221",
    delivery: "Free delivery by Wed, 15 Nov · Free 2-day returns",
  },
  {
    position: 40,
    title: "Electric and Gas Indian Type Coffee Machine 16 Inches",
    link: "https://yantracart.com/electric-and-gas-indian-type-coffee-machine-16-inches/?srsltid=AfmBOoq9oTyVvsu2p8Dvj88ZJMuZoETRavUVSgGgPELZSQglN9PaiITHNaE",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRLQPa14iEhBLylvt2ROCsGfWMGosdlPtw5cVZ4XeaitwcrPWFD9qSkJNyHjyqcpG-H0LjvYmCu4TZMlN7UkCLxfV3v3LaMSlv99_R_5bkWKp6WmOtx-P97Hw&usqp=CAE",
    source: "Yantracart",
    price: "₹13,080.00",
    extracted_price: 13080.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:368838301622900011",
    product_id: "368838301622900011",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=368838301622900011",
    delivery: "Free delivery by Wed, 8 Nov · Free 7-day returns",
  },
  {
    position: 41,
    title:
      "DeLonghi ECAM220.22.GB 132220079 Fully automated coffee machine Grey, Black",
    link: "https://www.conrad.com/en/p/-2698476.html?WT.srch=1&vat=true&utm_source=google&utm_medium=organic&utm_campaign=shopping&srsltid=AfmBOorotlheOugdwsEnFDwY90PR4kZMPxSKeOkYcmbdIbd52SOewhVTTVA",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRnYWTHpfKwu4ytre80zCOZ_E3ILUhohj8CQVA8-uSjU2m-eV3L-g1I3H5e8P48cfln91QoxhZfEukQAEQhZ9nbneziJ_wfFE1EofZkZ3kXZWtkMghgcDFz&usqp=CAE",
    rating: 4.5,
    reviews: 126,
    source: "Conrad Electronic International",
    price: "₹35,260.91",
    extracted_price: 35260.91,
    alternative_price: {
      price: "€399.00",
      extracted_price: 399.0,
      currency: "EUR",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13141013266845735164",
    product_id: "13141013266845735164",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13141013266845735164",
    delivery: "₹4,860.53 delivery · Free 30-day returns",
    extensions: ["Super Automatic", "With Grinder"],
  },
  {
    position: 42,
    title: "Countertop Espresso Machine One",
    link: "https://archi-monarch.in/downloads/countertop-espresso-machine-one/",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSEYoOeadFagQYNqVYsDpZkNeLdYZfmrG6FJdbpOW0UB-4s6aTLDMxC8jCI68CrGbkvEMwIFLVunvw-EKJKF2T2ZQIn2tJSoA&usqp=CAE",
    source: "Archi-Monarch",
    price: "₹5.00",
    extracted_price: 5.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15147669733029832004",
    product_id: "15147669733029832004",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15147669733029832004",
    delivery: "Free delivery by tomorrow",
  },
  {
    position: 43,
    title: "Black + Decker 4-Cup Espresso & Cappuccino Coffee Maker",
    link: "https://www.bhawanicorner.com/product/black-decker-4-cup-espresso-cappuccino-coffee-maker/",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR4srij37MhiAK_fBPHgq_Wj-UwqmQRgdk1iNkAqTQewrhq5btHL8tXiUV0qE1mtX_luA9-p97K44Lq4S-LpDsIv8L8d5NVt3-vyLM36VqHwWxVXzdd2FKi&usqp=CAE",
    source: "Bhawani",
    price: "₹4,595.00",
    extracted_price: 4595.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:16585923910532916882",
    product_id: "16585923910532916882",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=16585923910532916882",
    delivery: "Free delivery by Wed, 8 Nov",
  },
  {
    position: 44,
    title:
      "KIING Espresso Coffee Machine 16 inch Capacity 4 Liter 200 Cups at a time for Shops & Banquet Halls",
    link: "https://www.amazon.in/KIING-Espresso-Machine-Capacity-Banquet/dp/B09H4C8SZ7?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=AFO64RAHYT6H0",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRiET1ETERE2c-SjfrHkwrFEuK0tnPSHHCyUYP5rgtghrZTW0HAVKc6XUZricjHF2WZXmqN_-XyhvyPjsd1-rQa3shorgYO7N2g75rWTDvQkBXPP2FyndoT&usqp=CAE",
    source: "Amazon.in",
    price: "₹13,250.00",
    extracted_price: 13250.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13349752388423488657",
    product_id: "13349752388423488657",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13349752388423488657",
    delivery: "Free delivery",
  },
  {
    position: 45,
    title:
      "Italian Semi-Automatic coffee for espresso machine with High-Pressure Steam and Milk Frothing - Ideal for Home and Office Use - 20bar Capacity, 850W",
    link: "https://www.dhgate.com/product/coffee-coffee-makers-machine-italian-home/707620708.html?f=bm%7CGMC%7C%7Bifdyn:dyn%7D%7Bifpla:pla%7D%7Bifdbm:DBM%7D%7C%7Bcampaignid%7D%7C%7Badgroupid%7D%7C707620708%7C%7Btargetid%7D%7C144010003%7CUS%7Czhenghzouaiyao002%7C%7Bdevice%7D%7C2%7C%7Bgclid%7D%7C&utm_source=%7Bifdyn:dyn%7D%7Bifpla:pla%7D%7Bifdbm:DBM%7D&utm_medium=GMC&utm_campaign=zhenghzouaiyao002&utm_term=707620708",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSaH0ODn3G0Ep6ACfSIA4zRq4Nhd1ZT3FiPBINuXx-heVYwO2GrgW-bgDHejB_qIbsXpM6A9umdX6cr7La-k8LAQDUTuYQOVFUEXr8DugflmPMAg5R2tF081w&usqp=CAE",
    source: "DHgate online store",
    price: "₹26,226.17 + tax",
    extracted_price: 26226.17,
    alternative_price: {
      price: "$314.98 + tax",
      extracted_price: 314.98,
      currency: "USD",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:10537391792788915217",
    product_id: "10537391792788915217",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=10537391792788915217",
    delivery: "Free delivery",
    extensions: ["Semi Automatic", "Pump", "With Steam Wand"],
  },
  {
    position: 46,
    title: "20” Coffee Machine",
    link: "https://thecommercialkitchenstore.in/product/20-coffee-machine/?srsltid=AfmBOopYornetUyqUSmCtuu4x8ZwQrbxUDd3h1repL9aMqOhkqlvPmdpKHI",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTokCzt71WDlE2b38KPK0ivGoz9URR9rNk0uxxkAyNbfDiFX41GMxjY1-xQg9bz5C-XkcB7tNarIrIhEAjD95qaYLg6DhwkdTsyU3vS0jegD1Ec60B1uVBQPw&usqp=CAE",
    source: "The Commercial Kitchen Store",
    price: "₹16,000.00",
    extracted_price: 16000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15726369026086413554",
    product_id: "15726369026086413554",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15726369026086413554",
    delivery: "Free delivery by Fri, 8 Dec · Free 30-day returns",
  },
  {
    position: 47,
    title: "Budan Black Stainless Steel Solo Steamer Espresso Machine",
    link: "https://luxury.tatacliq.com/budan-black-stainless-steel-solo-steamer-espresso-machine/p-mp000000017430252?srsltid=AfmBOorion9sYl9XWPVY_DTEgqxR0PE30Ced1ADqO5ogFe_FGqiIzqvBgQ0",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRy47pWU94uJT7pA8AA4LeNXH3ZlHjo8VNeh1rLyYnHg2HwipsshrzsvlS0fkBnhQ6faTfcVLY5RoLmpEalaoPemwKJ2FIZeI3fX_zmgU7X1_XjP3kHEXBS&usqp=CAE",
    rating: 4.9,
    source: "TATA CLiQ LUXURY",
    price: "₹4,499.00",
    extracted_price: 4499.0,
    store_rating: 4.9,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:10996436336357011910",
    product_id: "10996436336357011910",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=10996436336357011910",
    badge: "Trusted Store",
    delivery: "Delivery date and cost shown at checkout · Free 10-day returns",
  },
  {
    position: 48,
    title: "Thermoplan B&W4 Ctm2 P Rl Office Coffee Machine",
    link: "https://in.jebelz.com/in/thermoplan-b-w4-ctm2-p-rl-office-coffee-machine.html",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRIaPy1H0ikRE1wI2jAQtv4pVrUWvCKZW-b5pCzwY9kL5IsQFOSNOKUbTPfkqpqIZNii-mhMCUYoghYNDhFcORzOngXIXPbbpjR26OifhsHLKR4SRW6hgy0&usqp=CAE",
    source: "Jebelz UAE",
    price: "₹23,84,898.88",
    extracted_price: 2384898.88,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:7718797572752835481",
    product_id: "7718797572752835481",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7718797572752835481",
    delivery: "Delivery date and cost shown at checkout · Free 10-day returns",
  },
  {
    position: 49,
    title:
      "WONDERCHEF Regalia Espresso Coffee Maker 15 Bar (Kitchen Appliances), Shop Now at ShoppersStop.com, India's No.1 Online Shopping destination",
    link: "https://www.shoppersstop.com/wonderchef-regalia-espresso-coffee-maker-15-bar/p-S22REGALIA11535001",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMVrrCDGZUR5T3pMDySrYc0y0YueqFe8_suN95avVCNZd2denqAqfWBUO9f9ex_uomRzij0Oc6GQuwWO_GGlS63BGZRXdy4ppoclelD8cDrEs2XVboayPu&usqp=CAE",
    source: "Shoppers Stop",
    price: "₹9,999.00",
    extracted_price: 9999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:5832380993694400753",
    product_id: "5832380993694400753",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=5832380993694400753",
    delivery: "Free delivery by Tue, 14 Nov · Free 180-day returns",
  },
  {
    position: 50,
    title: "Croma CRAK0028 Coffee Maker (Black)",
    link: "https://www.croma.com/croma-900-watt-10-cups-manual-espresso-coffee-maker-with-keep-warm-function-black-/p/186714?srsltid=AfmBOoqRhoZl4Ut4tiBB_jnA97hQnVryTITfhshU0Yw5iVNTHLd_I3PXbfg",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR4mRtQVXPYHRB_XJyWOOd3WPKOpNvBPm61PwdbHCh6GcEoU-TwDy6umhTjhStv2A6G6cDUttolErQodcqQCaKaMkef0glJZTX7WJV18zUZXSpPc8Gxw885lg&usqp=CAE",
    product_id: "7455525396265721581",
    rating: 4.7,
    reviews: 48,
    source: "Croma",
    price: "₹2,299.00",
    extracted_price: 2299.0,
    product_link:
      "https://www.google.com/shopping/product/7455525396265721581?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7455525396265721581",
    delivery: "Free delivery by Wed, 8 Nov",
    extensions: ["Manual"],
  },
  {
    position: 51,
    title: "Astoria Greta Espresso Coffee Machine",
    link: "https://www.kaapisolutions.com/product/astoria-greta/?srsltid=AfmBOorYskQxtSkkSL_2TXpchJ0dOHAq4_yHUYFhbx6mnbX0xB6NW0gRWOM",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS0ktTC9SvUcEl9x7vFuVLL2_T8SBgAxkOkhub84VcRvzCyVdSJsrERbwA3KuQJ-3h7O3-r8HUczmjJPtGaNxu7deZ2jpymGT4LSPK5NRG8kVLLPll7lckrKuyy&usqp=CAE",
    source: "Kaapi Solutions",
    price: "₹1,88,000.00",
    extracted_price: 188000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13016510405570561959",
    product_id: "13016510405570561959",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13016510405570561959",
    delivery: "Free delivery by Mon, 13 Nov · Free 2-day returns",
    extensions: ["Semi Automatic", "Pump"],
  },
  {
    position: 52,
    title:
      "Morning Machine with Lavazza Milk Frother | Hot & Cold Milk Frothing | Imported Nespresso Coffee Machine | Nespresso Capsules Coffee Machine",
    link: "https://caramelly.in/products/the-morning-machine-aeroccino-milk-frother?srsltid=AfmBOop9AHf-C6c_TRwiBwC2bxUfLNVvOXQBtt7W0E13UJgT-_TKrqc68bk",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR6_iXzy6GoSUpwRMN1X0lc9RELBF7SxsfzBySSzjgRwpiVzadIDuuuec3Bbnyb89kYPlbtnlfBD_ha_oPuEnJ0SjAOXrDHddvcC42vh56ldjXZmKB-dY65sA&usqp=CAE",
    source: "caramelly.in",
    price: "₹49,999.00",
    extracted_price: 49999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:12974881730717562098",
    product_id: "12974881730717562098",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=12974881730717562098",
    delivery: "Free delivery by Mon, 6 Nov",
    extensions: [
      "Automatic",
      "Pump",
      "With Steam Wand",
      "Nespresso",
      "Pod Compatible",
    ],
  },
  {
    position: 53,
    title: "Supreme Espresso Coffee Maker - Silver",
    link: "https://agarolifestyle.com/products/supreme-espresso-coffee-maker-silver?variant=45129791635729&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoo9n0-7PKryA0FBWAzpqP39Fu8xuoTwrdpYt9MiSkYLzPBuH1sRbfE",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRanj_9e8UJPS8lS6wMRWhU4MEAHzPmbc7T5J24z-jbdoM4-2Yfx8oWw0_08lKGIlOB14eKdSEdxvebKUUWoIyfIgABR8n13rz4w6QREuV21tU1ZAzCkimUJg&usqp=CAE",
    source: "agarolifestyle.com",
    price: "₹40,907.60",
    extracted_price: 40907.6,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:11709243014429260758",
    product_id: "11709243014429260758",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=11709243014429260758",
    delivery: "Free delivery by Wed, 15 Nov · Free 10-day returns",
    extensions: ["Super Automatic", "With Steam Wand", "With Grinder"],
  },
  {
    position: 54,
    title: "COFFEE-MAKER NERISSIMA GREEN medium 3 cups",
    link: "https://cothas.com/products/coffee-maker-nerissima-green?variant=40399086452891&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqvsBmihMs5WACP3ssiGWO6jmHQJCAaC4JYbT51YfXCSRr1TEgqzNI",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTAIv9L0mqseGsA_LuLD0Ysud65Kn7gKfRKCZikueo704L1wJpwN9ADgD_1dUzHOqA50VuegLjd98FaeBmRGp8Eu1TJtiN8MIjKNj0MWRCDae8hilfwh5ucir0&usqp=CAE",
    source: "Cothas Coffee Co,",
    price: "₹1,250.00",
    extracted_price: 1250.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:12089445176782182998",
    product_id: "12089445176782182998",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=12089445176782182998",
    delivery: "₹40.00 delivery by Wed, 15 Nov",
  },
  {
    position: 55,
    title: "Home Semi-Automatic Coffee Maker.",
    link: "https://coolnessforall.com/product/home-semi-automatic-coffee-maker?attribute_pa_color=red&attribute_pa_plug-type=uk&wmc-currency=GBP",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSsxsno0hzIiQFwj9Vqv01lgIdHcp45imbYZKDIsVwyGpTenIDBxtC3Z2Vxpfc-nsukF7EtQ8bmlOy1ejI6UosARvQ-7QdrbgTuNwK4NYs4HLoo6GPCjh6M&usqp=CAE",
    source: "house hold goods",
    price: "₹14,049.43",
    extracted_price: 14049.43,
    alternative_price: {
      price: "£138.58",
      extracted_price: 138.58,
      currency: "GBP",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:14696039157264282623",
    product_id: "14696039157264282623",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=14696039157264282623",
    delivery: "Delivery date and cost shown at checkout",
    extensions: ["Pod Style"],
  },
  {
    position: 56,
    title: "Prestige PCMD 4.0 Coffee Maker 800 W, 0.7L",
    link: "https://niya-lifestyle.com/product/prestige-pcmd-4-0-coffee-maker-800-w-0-7l/",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR4YF6v1v8s8eDSR2Fudipn9TjmzUBj1AVHUVll9dU1oWzcVqplNoJVpW5dy4oJfpiao4XHFyT6pyuZ19mc7Pl-SHH-dXp2vIcf7_cM-M0a1mrqpVQdsgTfrQ&usqp=CAE",
    source: "Niya Lifestyle",
    price: "₹2,400.00",
    extracted_price: 2400.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13085844524354465202",
    product_id: "13085844524354465202",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13085844524354465202",
    delivery: "₹70.00 delivery by Wed, 8 Nov",
    extensions: ["Drip"],
  },
  {
    position: 57,
    title:
      "Budan One Touch Espresso Coffee Machine - POD + Fresh Ground Coffee",
    link: "https://www.amazon.in/Budan-Touch-Espresso-Coffee-Machine/dp/B0CG5XQVBR?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1ARORGL9FW6LS",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSJVS0nfV0sDbU8fjeWDwHxhkA7lD568vEKwkFGECMwrNgWYEtB0l_zR97BUodHOgxT5VUGBLZA3lHTd-ebDfKNxsSWjuKfe9d1Ky3Fjlzm0UZJxNwlLbox&usqp=CAE",
    product_id: "3561203722113005422",
    source: "Amazon.in",
    price: "₹17,999.00",
    extracted_price: 17999.0,
    product_link:
      "https://www.google.com/shopping/product/3561203722113005422?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=3561203722113005422",
    delivery: "Free delivery",
    extensions: ["Automatic", "Pump", "With Steam Wand", "Pod Compatible"],
  },
  {
    position: 58,
    title: "Carysil Built-In Coffee Machine BUILT IN COFFEE MACHINE 01",
    link: "https://decure.in/carysil-built-in-coffee-machine-built-in-coffee-machine-01.html?utm_source=google&utm_medium=feed&srsltid=AfmBOoo6WFTuK-xgWbz1lUBeOzUngkjGHvz4ok65ENq8UUfTlxx8lXTskuE",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrq7HKHNmEXGItBxqIVxoLMKaBcuaQzYzWulapRmuaKmI8lvInxts2fRud02sOu2tZtFj2lAU3T8pF1uV7dsEbkf51OlFznrV0quZO9T1GyBUdHwKqJP-SuA&usqp=CAE",
    source: "Decure.in",
    price: "₹1,51,991.00",
    extracted_price: 151991.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15167586006822703073",
    product_id: "15167586006822703073",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15167586006822703073",
    delivery: "Free delivery by Thu, 16 Nov · Free 7-day returns",
  },
  {
    position: 59,
    title: "Electric and Gas Indian Type Coffee Machine, 18 Inches",
    link: "https://yantracart.com/electric-and-gas-indian-type-coffee-machine-18-inches/?srsltid=AfmBOoq5NRRbBHMPD3o4DbynH38EGS2vg5doErDtVe7p7G5f7cj2jLxUqvs",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRxZ8nVJ4km_V1F2QARc0OhH5tdkfVPeSJmtIshuLdpwCVcTw8bSqf4CC3HSifml1WvAJbYSTL8yxObhB7XZ11uj9P-qAEyrSFr49XQM8jCPhswz0BiNMqx&usqp=CAE",
    source: "Yantracart",
    price: "₹14,500.00",
    extracted_price: 14500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:10472293704368528668",
    product_id: "10472293704368528668",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=10472293704368528668",
    delivery: "Free delivery by Wed, 8 Nov · Free 7-day returns",
  },
  {
    position: 60,
    title: "Fully Automatic Coffee Machine",
    link: "https://www.tradeindia.com/products/fully-automatic-coffee-machine-6265186.html",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQMR6FG9MkwTsyssedqkMcQn_FxDMMxJGV92M5E8DC-9JvRYT2VHW5p9bkT16BV2UT0vnjZrOc-Ys367BWk0v6WpdlX6sqvgR-1HOa02iw-vgSnu22FBp6Gmg&usqp=CAE",
    source: "Tradeindia.com",
    price: "₹19,500.00",
    extracted_price: 19500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:16801548057957272895",
    product_id: "16801548057957272895",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=16801548057957272895",
    delivery: "Delivery date and cost shown at checkout",
    extensions: ["Automatic"],
  },
  {
    position: 61,
    title: "Gruppo Argentini Arpa 2Gr 3300 W Coffee Machine",
    link: "https://www.industrybuying.com/coffee-machine-gruppo-argentini-FUR.COF.72614428/?srsltid=AfmBOorcs-YW__B0hGKYNGGnNumX5CivIxa_qcMQ2jaXyAU5CoxrvMAsNpM",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcThrQQdSOz5AAz-GvAcCd4Z6Rsxo2Mu-mAUCd72_85i6euTs7CvAIT4kUYLY8IT9n_qaKE-oQWc60N8O75tLqH1BAxe1Hu9_51KZw-MD9yuxuhokmIT6_30&usqp=CAE",
    source: "IndustryBuying",
    price: "₹2,18,000.00",
    extracted_price: 218000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:500790996674174088",
    product_id: "500790996674174088",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=500790996674174088",
    delivery: "Free delivery by Wed, 15 Nov",
  },
  {
    position: 62,
    title: "Swan Pump Espresso Coffee Machine - Green",
    link: "https://www.electricalworld.com/Mobile/en/in/Swan-Pump-Espresso-Coffee-Machine---Green/m-m-5487.aspx?PartnerID=182566&utm_source=google&utm_medium=shopping&utm_campaign=India",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQpnm022CpjSPMs0JASXRtKubuc-UB8B3YIKQS2vnwU2sZFC7ciKC9TAC28r3gwG8SK-GNVnuqL1gke1J27md_6YmeIPT31Dy6HU6RTBH6ky5mV56ExZY9G&usqp=CAE",
    product_id: "15739392473436670017",
    rating: 4.3,
    reviews: 917,
    source: "Electrical World",
    price: "₹11,573.29",
    extracted_price: 11573.29,
    product_link:
      "https://www.google.com/shopping/product/15739392473436670017?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15739392473436670017",
    delivery: "₹831.98 delivery · Free 30-day returns",
    extensions: [
      "With Grinder",
      "Automatic",
      "Pod Compatible",
      "Pump",
      "With Steam Wand",
      "Gifts for Mothers",
    ],
  },
  {
    position: 63,
    title: "24 Inch Coffee Machine Gas And Electric For Cafes & Marriage Party",
    link: "https://rojgarbox.com/products/24-inch-coffee-machine-gas-and-electric-for-cafes-marriage-party?variant=43707970093269&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqEQleaieJYw-eGMrp57XqXQGG2RGMvH4jzTSBBbZ7ILfSIxTE0U8A",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSR5C910z2w_Hd4cUTOKDTCBBCvJo6509RQx4sRQgoDy_rDXBuKsD73r0Q6qEgmBlJbSIc1WXydov6q5ILpBNXfbp7Z1fxilTzqXEiqz_e7x17N7QrJHS7k4Q&usqp=CAE",
    source: "rojgarbox",
    price: "₹16,100.00",
    extracted_price: 16100.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:1118865558712901408",
    product_id: "1118865558712901408",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=1118865558712901408",
    delivery: "Free delivery by Wed, 15 Nov · Free 3-day returns",
  },
  {
    position: 64,
    title:
      "Coffee Makers - Budan Espresso Machine and Electric Espresso Grinder (Silver & Black) - Pepperfry",
    link: "https://www.pepperfry.com/product/budan-espresso-machine-and-electric-espresso-grinder-silver-black-2092815.html",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmne982LLeGusaiS1DREJ_MDpN28PBNcjnaoyymOyZVMhuza0BSJbZBYn6tfOHZzMu_-yP5q6jAnPEBeiF9zFIeqvNU_rnqqz0GpdqgFrjclhQEm-TsTij&usqp=CAE",
    source: "Pepperfry",
    price: "₹29,999.00",
    extracted_price: 29999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:6305553895230641173",
    product_id: "6305553895230641173",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=6305553895230641173",
    delivery: "Delivery date and cost shown at checkout · Free 14-day returns",
    extensions: ["With Grinder"],
  },
  {
    position: 65,
    title: "Faema E61 Jubile AV Auto 1 Group Traditional Coffee Machine",
    link: "https://in.jebelz.com/in/faema-e61-jubile-av-auto-1-group-traditional-coffee-machine.html",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQx7ejq1xaq5HQft_Wsrw0iQJhngrbeoSfMQU-m0EkKCM92_Vh5txvw-qIIwb9Odl7usyguzET88WPMyEPsgDPm96tI4YumRrbTzsrS1PZUpwWVwMxhqchb8A&usqp=CAE",
    source: "Jebelz India",
    price: "₹11,48,754.88",
    extracted_price: 1148754.88,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:4911593541488757750",
    product_id: "4911593541488757750",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=4911593541488757750",
    delivery: "Free delivery · Free 10-day returns",
    extensions: ["Automatic", "With Steam Wand"],
  },
  {
    position: 66,
    title: "Budan Espresso Machine with In Built Grinder | Best Coffee Machine",
    link: "https://somethingsbrewing.in/products/budan-espresso-machine-with-in-built-grinder?variant=42905145540858&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoog5cVMGxu-jC5y4lk-nylyKaP3RA_soSXRkUuk5yQU_rlbSy171Zg",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ9HByzZOjh-zGF4Jz4hDKrsuJYiH-oH80AAVbQ502grCrLyiidyVlzl8vCtGGJX2ii6cAbWyL5PaE0mADUPfiaF5wYsl8y7i2tTmtCm-Ls&usqp=CAE",
    source: "Something's Brewing",
    price: "₹45,061.00",
    extracted_price: 45061.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:12573424463946934020",
    product_id: "12573424463946934020",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=12573424463946934020",
    delivery: "Free delivery by Wed, 15 Nov · Free 7-day returns",
    extensions: ["With Grinder", "Super Automatic", "With Steam Wand"],
  },
  {
    position: 67,
    title: "Delonghi EC 9 Filter Coffee Machine – EC 9",
    link: "https://mahajanelectronics.com/products/delonghi-ec9-800-watt-steam-espresso-coffee-maker?variant=40288050380857&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqHVHywXdoowHscgUY9pcgF1_-co04y5gWO0t86xA3LiRo6XAjLHj8",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRPnSEQU8fYfTge_ftlVqk6QgM8qQCIoSUsVj7yp9zC-Nv-oJ7HDxPaGLZccfmkULotNC6HBQDhoBmwqOYRLB6Lh8VMFgL6xm1cmhzmD1z_QFwJ-m_E4XC9&usqp=CAE",
    product_id: "14981737980086480851",
    rating: 3.8,
    reviews: 13,
    source: "Mahajan Electronics",
    price: "₹8,890.00",
    extracted_price: 8890.0,
    number_of_comparisons: "2",
    comparison_link:
      "https://www.google.com/shopping/product/14981737980086480851/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:14981737980086480851,cs:1,eto:6916515532940664887_0,pid:7629958426758590287,rsk:PC_15750819539955166598",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A14981737980086480851%2Ccs%3A1%2Ceto%3A6916515532940664887_0%2Cpid%3A7629958426758590287%2Crsk%3APC_15750819539955166598&gl=in&hl=en&num=100&offers=1&product_id=14981737980086480851",
    product_link:
      "https://www.google.com/shopping/product/14981737980086480851?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=14981737980086480851",
    delivery: "Free delivery by Wed, 15 Nov",
    extensions: ["Steam Powered"],
  },
  {
    position: 68,
    title: "Carimali Bubble Three Group Coffee Machine",
    link: "https://detec.in/products/carimali-bubble-3-group-coffee-machine?variant=40977527734427&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorHyF1CPM-O0_USc8FIlkYmRkOzAxtEQM9DfOsDlSuwubzLeaX2nAg",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTGit6jRiCTYdsDR326Mxy6KIs1Q6ppmRBNzEdv8o4IHVvllVnSMchzBpdCj6b4s_Xzu5uzfun9c2u_zVIbPz9oyrK9Ppicr4QvL4_3cx_oHUw_Lx167JHC&usqp=CAE",
    source: "detec.in",
    price: "₹5,12,805.00",
    extracted_price: 512805.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15070785176781352561",
    product_id: "15070785176781352561",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15070785176781352561",
    delivery: "Free delivery by Wed, 15 Nov · Free 10-day returns",
  },
  {
    position: 69,
    title:
      "AGARO Royal 750 Watt 4 Cups Automatic Drip Coffee Maker with Auto Shut Off (Black/Silver)",
    link: "https://www.croma.com/agaro-royal-750-watt-4-cups-automatic-drip-coffee-maker-with-auto-shut-off-black-silver-/p/270750?srsltid=AfmBOorK3aRolCUp1Odqk5_IOHiveHD6DeaO7QfinjlLBLn_XZgIum2QPHI",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ8bFc_e1ev2HQ2vv0GP5TTnUpFqw7Y874d2sy8juANNPwlq5iZ8qHOgr7URvd-gpVC7vlrqLCjUWo0cyXau7WOMlv_qZXQc1wML_89Ue1HeZIRa9p6c1Rl6g&usqp=CAE",
    product_id: "7348794838397740736",
    rating: 5.0,
    reviews: 2,
    source: "Croma",
    price: "₹1,499.00",
    extracted_price: 1499.0,
    product_link:
      "https://www.google.com/shopping/product/7348794838397740736?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7348794838397740736",
    delivery: "Free delivery by Wed, 8 Nov",
    extensions: ["Drip"],
  },
  {
    position: 70,
    title: "Heavy Duty 16 inch Indian Coffee Machine for Restaurants",
    link: "https://www.toolsvilla.com/16-inch-indian-coffee-machine?srsltid=AfmBOopSr_8mSPrwgduBQ84c5VLHPuUXqqMEUQk_m9SlfBwroJX8FBQHt7A",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcStn0NbNt5ZTzXJF2RO7rHhcV-2AcQhB-NZc4XjN4L8aETn9IOvTFp1K8uIRLKZ_SWgHz3_aOdFy-OsUXpSGQQxkKmfLMdocjeQDScd2k5L5WxRWd5_ZYODow&usqp=CAE",
    source: "Toolsvilla",
    price: "₹12,499.00",
    extracted_price: 12499.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15525008495507689114",
    product_id: "15525008495507689114",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15525008495507689114",
    delivery: "Free delivery by Thu, 9 Nov",
    extensions: ["Semi Automatic"],
  },
  {
    position: 71,
    title:
      "InstaCuppa Espresso Coffee Maker with Italian Ulka Pump, Thermoblock Heating Technology, Milk Frother Steam Wand, Simple LED Touch Operation, ",
    link: "https://instacuppastore.com/products/instacuppa-espresso-maker-with-20-bar-pressure-thermoblock-heating-and-led-touch-control?variant=46031174205721&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorCja2fmeO5RJZDMUWfuzZVSE1Wp55-jdcvLueXn6NAFSUSKYm5mPw",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTVcu6zo5iBfggaB3G0MW-qmf83riWvoPwHPyo61odtc7gl5gO9ZmkzKO7rSR9SjLCc1JJudLwavYsceykaPj9XQ33y9k2P7TYHxkCOQtRE8MNayyZJfRKFVw&usqp=CAE",
    source: "InstaCuppa",
    price: "₹14,999.00",
    extracted_price: 14999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13009382310091371426",
    product_id: "13009382310091371426",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13009382310091371426",
    delivery: "Free delivery by Wed, 15 Nov · Free 10-day returns",
    extensions: ["Pump", "With Steam Wand", "Gifts for Mothers"],
  },
  {
    position: 72,
    title: "Morphy Richards 1350 W Kaffeto",
    link: "https://www.theelectriconline.com/morphy-richards-1350-w-kaffeto.html",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR8vdCwpqCJz4-exuvbTV381ONjJkGOmWBnLz7-EIzu2zEacrAkVLD3GoMQhjBkE90m2spvDqJqlZP9K_LReOwXrMqdWtCEsC1SKHsZu9YdX7E2vuqaMpOsbw&usqp=CAE",
    source: "TheElectricOnline.com",
    price: "₹15,450.00",
    extracted_price: 15450.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:6623912498526863142",
    product_id: "6623912498526863142",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=6623912498526863142",
    delivery: "Free delivery by Mon, 13 Nov",
    extensions: ["With Steam Wand"],
  },
  {
    position: 73,
    title:
      "KIING Espresso Coffee Machine 14 inch Capacity 3 Liter 150 Cups at a time for Shops & Banquet Halls",
    link: "https://www.amazon.in/KIING-Espresso-Machine-Capacity-Banquet/dp/B08NF55PWW?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2PVLR56M7211W",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQjZwijF_QlA14oZIHW7IafCC3Sap9ERf5rQOw60AkOlRQKCuOobocTSODj1F3nPups_Czu9MqzejcRHLRYYHRA7fmXqrsuNZbDNkF-mVQoK4q3Lij_dFKW&usqp=CAE",
    source: "Amazon.in",
    price: "₹9,999.00",
    extracted_price: 9999.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:17855195484597076076",
    product_id: "17855195484597076076",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=17855195484597076076",
    delivery: "₹60.00 delivery",
  },
  {
    position: 74,
    title: "Coffee Machine, 2 Kw",
    link: "https://www.aajjo.com/vending-machines-dispensers/coffee-machine-2-kw-in-ambala-energy-solutions-2/product",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRTtKsK8nlMl-sZ3GhTcbLuNHcGiFVoU0L665kRFJu-S_eh2xGzJIbyYP_3l_NF_KER1oBYvqoIBUeaVohqj528s1clfoKkmLB2tNVH-b0n1Khy40V2bdSH&usqp=CAE",
    source: "Aajjo.com",
    price: "₹15,000.00",
    extracted_price: 15000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:15067006040618978919",
    product_id: "15067006040618978919",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15067006040618978919",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 75,
    title: "LACIMBALI 150 Cups/day S15 Milk Coffee Machine, S15 - CP10",
    link: "https://www.industrybuying.com/coffee-machine-lacimbali-FUR.COF.721392370/?srsltid=AfmBOopGWPKB9h4fbmo3ASdoicxwcM4PPRD0uaGKa9E550_ugVmkatKdJag",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR12GazvMjyivRGHPuBiJG8sfplXH1KICxyCcMOwOrsI325CzRd_wBsbbMwHPwcVZf_Bu2pJcEd_t-GjEV5mWjGa0JpFTCNFSldmeLXDRraCdO6EfCNMBC5uQ&usqp=CAE",
    source: "IndustryBuying",
    price: "₹7,48,715.00",
    extracted_price: 748715.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:4656598299507360655",
    product_id: "4656598299507360655",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=4656598299507360655",
    delivery: "Free delivery by Wed, 15 Nov",
  },
  {
    position: 76,
    title:
      "Electric & Gas Operated Indian Espresso Coffee Machine With Autocut 20 Inch",
    link: "https://yantracart.com/indian-espresso-coffee-machine-with-auto-cut-20-inch/?srsltid=AfmBOorz70sMkPWnK54tg2xfWcaQdEpMUSr_cxwh5Zqy8IT5KKGYLJl76Qk",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQdaxn4pbAxinNYqd0mA-R5IxXrw1QLOMkfqctTX-LOs7pYH2WTdPJAkPAh-ghhcpBhU80e2xZSS4osnJKVz5tQASluHNWA-poBWmMZ5DGVG4lXAcZaxkpKjg&usqp=CAE",
    source: "Yantracart",
    price: "₹16,670.00",
    extracted_price: 16670.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:11700068067243858066",
    product_id: "11700068067243858066",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=11700068067243858066",
    delivery: "Free delivery by Wed, 8 Nov · Free 7-day returns",
  },
  {
    position: 77,
    title:
      "Wonderchef Regalia Fully Automatic Coffee Machine with Large 7 Inches Display | For brewing Americano, Cappuccino, Latte, Macchiato, Flat White,",
    link: "https://www.wonderchef.com/products/regalia-fully-automatic-coffee-machine?currency=INR&variant=42154486497457&utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&stkn=3e9b41fef059&srsltid=AfmBOorM7BNMcyEiRXGpBrAgUiHVczVFUGxGDYHBXFLH8lvvu7H9EdQ0qbk",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhWq6BO8BWdzBEf7z6WJFVQYhTymfjsDrzSWh74Z09ZquzF4Fm_O6Fgy-iGkOqpfQhwe0bbNAPJ3zD77TEKlk0CMojGmxr43tQNwdYchgUwcbtpJu4PqWc&usqp=CAE",
    product_id: "15068586451943955389",
    rating: 3.6,
    reviews: 333,
    source: "Wonderchef",
    price: "₹82,999.00",
    extracted_price: 82999.0,
    number_of_comparisons: "2",
    comparison_link:
      "https://www.google.com/shopping/product/15068586451943955389/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:15068586451943955389,cs:1,eto:14095953465269955730_0,pid:8983982548880235113",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A15068586451943955389%2Ccs%3A1%2Ceto%3A14095953465269955730_0%2Cpid%3A8983982548880235113&gl=in&hl=en&num=100&offers=1&product_id=15068586451943955389",
    store_rating: 3.6,
    store_reviews: 333,
    product_link:
      "https://www.google.com/shopping/product/15068586451943955389?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=15068586451943955389",
    badge: "Trusted Store",
    delivery: "Free delivery by Wed, 15 Nov · Free 3-day returns",
    extensions: ["Automatic", "Pump", "With Steam Wand", "With Grinder"],
  },
  {
    position: 78,
    title:
      "Espresso Machine 15 Bar Pump Pressure, Espresso And Cappuccino Coffee",
    link: "https://www.ebay.com/itm/386008258337",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTNSrtYR04K2ZvMhB5_d4wos4eK9obqPrAOCl1Ku7Qff1KJi3ltaswNkvhc0BEMxRyCc4ag1NdrYsHGT4ZRiB7Y2jPer_xDIyJRR6KLz5lb&usqp=CAE",
    source: "eBay",
    price: "₹8,556.93 + tax",
    extracted_price: 8556.93,
    alternative_price: {
      price: "$102.77 + tax",
      extracted_price: 102.77,
      currency: "USD",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:8361849674497666798",
    product_id: "8361849674497666798",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=8361849674497666798",
    delivery: "Delivery date and cost shown at checkout",
    extensions: ["Pump", "With Steam Wand"],
  },
  {
    position: 79,
    title:
      "Commercial Stainless Steel Electric and Gas Indian Espresso Coffee Machine, 18 Inch",
    link: "https://vhsindia.in/product/28908391/Commercial-Stainless-Steel-Electric-and-Gas-Indian-Espresso-Coffee-Machine--18-Inch?utm_source=GMC",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT_YGFZ6GlU2IE0Gu1bx9QE9n4-GJJCUzuhzC8jqQa7UrmDeDXTsJt2vDA7BcR02xd0l1URU3dFeCr5X21aAGQ-xDJcPXty5Kq01EN49i5REXHp6BWLkPuS4w&usqp=CAE",
    source: "Vardhman Hotellers Solutions",
    price: "₹18,600.00",
    extracted_price: 18600.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:7271202355766305403",
    product_id: "7271202355766305403",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7271202355766305403",
    delivery: "₹100.00 delivery by Thu, 16 Nov",
  },
  {
    position: 80,
    title: "Astoria Storm 4000 SAEP 2-Group Coffee Machine - Copper/Black",
    link: "https://in.jebelz.com/in/astoria-storm-4000-saep-2-group-coffee-machine-copper-black.html",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTEcfBffikV23aReoII_JdoNgkoxnNEDhUqWTeMSrLVa1DoaHHLdbutPKNumPrUU9Yh-ntki6rpiyEScz80BN1eo9RvC3wChViCjmrRZU2WlP_06gbXLN8E4bo&usqp=CAE",
    source: "Jebelz India",
    price: "₹16,74,400.00",
    extracted_price: 1674400.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:8172304902331763531",
    product_id: "8172304902331763531",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=8172304902331763531",
    delivery: "Free delivery · Free 10-day returns",
    extensions: ["With Steam Wand"],
  },
  {
    position: 81,
    title: "Bosch Tassimo Happy TAS1001",
    link: "https://www.conrad.com/en/p/-1842777.html?WT.srch=1&vat=true&utm_source=google&utm_medium=organic&utm_campaign=shopping&srsltid=AfmBOoql2lMtssCnGndglJQJ-Ko00YCZMqYWYtz8sCF5mw_dXqwpR2JdD8Q",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRqT2hrGBXjp_DLg1uoDgVMcWamU9PLGSWyiOccjpZeiDdTq-P07AqDi9kNsB-xvYWxzSikmBnJ7BSszzjzUZ1rUk6vBrzXsN2KFVB88s849xUi1eBusiE3GA&usqp=CAE",
    product_id: "822371687335479763",
    rating: 4.6,
    reviews: 3844,
    source: "Conrad Electronic International",
    price: "£4,594.52",
    extracted_price: 4594.52,
    alternative_price: {
      price: "€51.99",
      extracted_price: 51.99,
      currency: "EUR",
    },
    product_link:
      "https://www.google.com/shopping/product/822371687335479763?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=822371687335479763",
    delivery: "₹5,302.40 delivery · Free 30-day returns",
    extensions: [
      "Automatic",
      "Pump",
      "Nespresso",
      "With Grinder",
      "Pod Compatible",
      "Purple & White",
    ],
  },
  {
    position: 82,
    title: "NICR 560 Cafe Romatica fully automatic espresso machine",
    link: "https://coffeeworkz.com/products/nicr-560-cafe-romatica-fully-automatic-espresso-machine?variant=41936973201591&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorMdpjP3kYzEeEKUnj_Ez5J5SsxN5BFfc8OujYbswg8pBJ2F0_9ERM",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRY-5eKayX6XVe4eAuFiMIhGqNPJL2H5M2YkbXYzTGqMvMTj_BUFuHNPOv80Cupesq-iB8yeL7sUY5QHl9BOLJq2a2lpSOBCy-tt18CBU_l3OQaAd8fCUGh9g&usqp=CAE",
    source: "Coffeeworkz",
    price: "₹1,08,000.00",
    extracted_price: 108000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:8545778283830300951",
    product_id: "8545778283830300951",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=8545778283830300951",
    delivery: "Free delivery by Wed, 15 Nov · Free 7-day returns",
    extensions: ["Automatic", "Pump", "With Grinder"],
  },
  {
    position: 83,
    title:
      "Melitta TS Smart Bean to Cup Coffee Maker | Best Coffee Machine for Home and Office | Best Imported Coffee Machine in India",
    link: "https://caramelly.in/products/melitta-barista-ts-smart?srsltid=AfmBOooki_tVIbHWjFflXR8mO7hRwKk8tjLCJbOoPZ9AbLu4rD_OjaIix_0",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSGdpNh8ufuzXScZXOmP4JYXsyKGsmqNFa2Lx20ZPWEEGoHTk-MuocIpUJlKozoyCcWf7mJt3gJQj8y1upPSEANW24sHNjXXXvF0QWodPFZdGG7etnBN4z1&usqp=CAE",
    rating: 4.6,
    reviews: 422,
    source: "caramelly.in",
    price: "₹1,84,900.00",
    extracted_price: 184900.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9483368570760276164",
    product_id: "9483368570760276164",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9483368570760276164",
    delivery: "Free delivery by Mon, 6 Nov",
    extensions: ["Super Automatic", "With Grinder"],
  },
  {
    position: 84,
    title: "Black & Decker Appliances DCM25-IN 330-Watt 1-Cup Coffee Maker",
    link: "https://easy-buy.in/product/black-decker-appliances-dcm25-in-330-watt-1-cup-coffee-maker/?srsltid=AfmBOopL9uyvTU_8Xw5fEiSIehhXxdDPmUA_rRlFwxLGg7JWXw4oaYgSb8E",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRGk-8X-Yzju1_IZxtUjN52jJcJA-uzKkvNOangxOBMfiAUxJ4Zld7Hgn6X-u7Ts-qi_AD2_ymeQdhUVZMbHgL6KCPdN4B9_u5UNrKtgQd135PzJtzLLOhpC9FZ&usqp=CAE",
    source: "easy-buy.in",
    price: "₹1,499.00",
    extracted_price: 1499.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:5858002999572935917",
    product_id: "5858002999572935917",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=5858002999572935917",
    delivery: "Delivery by Thu, 9 Nov · Free 7-day returns",
  },
  {
    position: 85,
    title: "Morphy Richards Autopresso 1350 W Milk Frother and Coffee Maker",
    link: "https://bhasinappliances.in/product/29381295/Morphy-Richards-Autopresso-1350-W-Milk-Frother-and-Coffee-Maker?utm_source=GMC",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTOrV-uSrUi7H6fyvEzw3IS9VYsI7j7mXFOnLSYJXWwjCDfYc8ZuK2qmn7zyc-f4gf50D-UG2IFgXjbtTskwIA3wPiLwynU8GCU_QNMgB5CO9cCncz5O51x&usqp=CAE",
    source: "Bhasin Appliances",
    price: "₹20,995.00",
    extracted_price: 20995.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:8363409317057637232",
    product_id: "8363409317057637232",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=8363409317057637232",
    delivery: "₹250.00 delivery by Wed, 15 Nov",
    extensions: ["With Steam Wand"],
  },
  {
    position: 86,
    title: "20 Inch Coffee Machine Gas And Electric For Cafes & Marriage Party",
    link: "https://rojgarbox.com/products/20-inch-coffee-machine-gas-and-electric-for-cafes-marriage-party?variant=43708726247637&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoovocHyXXIRFfxWRqQPr5oIneqfRpIOLvUdHiCf0XHP35aB9qUn08Y",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTNyzP9S7j8MxeZy_0fQRX1bprCEp0JAG2rt5D594zVNnB63NdqUSeAcz5itTZDqcFo-43x6sLpBNhaHj6Fe9BWweZNbnxFgZYXZ85-qLeWrsQ7yOWHzjpygA&usqp=CAE",
    source: "rojgarbox",
    price: "₹13,500.00",
    extracted_price: 13500.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:7848514154680283418",
    product_id: "7848514154680283418",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=7848514154680283418",
    delivery: "Free delivery by Wed, 15 Nov · Free 3-day returns",
  },
  {
    position: 87,
    title: "Budan Silver Pro Commercial Medium Coffee Machine",
    link: "https://luxury.tatacliq.com/budan-silver-pro-commercial-medium-coffee-machine/p-mp000000014116410?srsltid=AfmBOorXMPwzgHQdRU7-Zoj64xWSWYQGsdXQemyJKveAFiKsNwMvsDIUMs0",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQLjr7IoJKCnYy4nUa6VLny8UmTOnev_N3FuKpxcGw1L9f-OskTL8qIPahNinO6exyl7BiRx6k0oORecjsLXsL5z7EhR4qsfG2NW-p36zbH5zYNVOisf-7Uzg&usqp=CAE",
    rating: 4.9,
    source: "TATA CLiQ LUXURY",
    price: "₹1,17,000.00",
    old_price: "₹1,30,000.00",
    extracted_old_price: 130000.0,
    tag: "SALE",
    extracted_price: 117000.0,
    store_rating: 4.9,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:14416522196765612850",
    product_id: "14416522196765612850",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=14416522196765612850",
    badge: "Trusted Store",
    delivery: "Delivery date and cost shown at checkout · Free 10-day returns",
    extensions: ["Pump"],
  },
  {
    position: 88,
    title: "Casadio Undici A1 Semi automatic machine 1 Group",
    link: "https://korebi.coffee/products/copy-of-casadio-undici-a1-semi-automatic-machine-1-group?variant=45228569723196&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRYB2HTMFNIbt-v0BK62E__s9lrBYFtybqsTKd0ux44d9hI2nFXCBAjJ0SoTE88ta6YEv83_O7Xt-vUOAtTu02jCynOIGlpxFXS7R1VMbVADgn6m2q3NDwupg&usqp=CAE",
    source: "Korebi Coffee",
    price: "₹1,76,213.00",
    extracted_price: 176213.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:4729610224527240681",
    product_id: "4729610224527240681",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=4729610224527240681",
    delivery: "Free delivery by Wed, 15 Nov",
    extensions: ["Semi Automatic"],
  },
  {
    position: 89,
    title: "Royal Drip Coffee Maker - 750W",
    link: "https://agarolifestyle.com/products/royal-drip-coffee-maker-750w?variant=45109966766353&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoopuraxMg8KMngcpuHsYGg5Jt-g52Fh5jcve1R9hILXG0QVmL68xS4",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR_8S4FKpBH9PIFUZAydBMPpVIwXGH_gqJqTQE5FdahbEpoww6Cl1gI9HYfQfIW4HfeR_LUEz2_xyHEeHKgP0K2Yh-KcXZKp6mC1zzrRm7NaUuNMijEc5QA&usqp=CAE",
    source: "agarolifestyle.com",
    price: "₹1,886.82",
    extracted_price: 1886.82,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9001516010324110708",
    product_id: "9001516010324110708",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9001516010324110708",
    delivery: "Free delivery by Wed, 15 Nov · Free 10-day returns",
    extensions: ["Drip"],
  },
  {
    position: 90,
    title: "Kalerm Quarza Coffee Machine",
    link: "https://www.tradeindia.com/products/kalerm-quarza-coffee-machine-4840740.html",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXczh2962M4tL-lRPHRCxXaFLNQbRgqH436ay8X7A6644VQ7uhWFZaqdPMZ_SJeDq04e30xzDt1KPhe2IlfRkerETzkYYv&usqp=CAE",
    source: "Tradeindia.com",
    price: "₹11,000.00",
    extracted_price: 11000.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13900683439442402351",
    product_id: "13900683439442402351",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13900683439442402351",
    delivery: "Delivery date and cost shown at checkout",
  },
  {
    position: 91,
    title:
      "Heavy Duty Double Heater Coffee Machine with Autocut, 16x18x16 inch",
    link: "https://www.toolsvilla.com/Coffee-Machine-with-Autocut-16-18-16-inch?srsltid=AfmBOorQNBd7Y-Wcxgb-IcaV9z4ndbSFvTu0tK6wxzalnDiGlQUzI27fJfU",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRdJV_wl3W604CGxJIOii4Yb-gAm7B_sRXNpGm9obHqslO7YELw5WRSyDeV5T4-k_McWna2x9tK04BTry2VX1CgIdoR0BICg7mkoX9KhyXhtVCwje_VLJjgFw&usqp=CAE",
    source: "Toolsvilla",
    price: "₹26,269.00",
    extracted_price: 26269.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13134693732000585086",
    product_id: "13134693732000585086",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13134693732000585086",
    delivery: "Free delivery by Thu, 9 Nov",
  },
  {
    position: 92,
    title: "Inalsa Cafe Aroma 800 Watt Espresso Coffee Maker (Black)",
    link: "https://www.kitchenbrandstore.com/product/inalsa-cafe-aroma-4-cups-coffee-maker?srsltid=AfmBOopMLQWPBcXcFB3fiBGtCEMIfXLcxHoWMZvruJj7QMLMcYK-ZU9sa7Y",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRW9Wis3fKTbnjbgBJZXaJycGvkWy2xuvLGb1AdXtHhZ7Yeipoyb2YFQfhO_rY3GpYXonRcT7M1kFo-fayFLXI7PEk3rMfCQ8mQhFGNhME&usqp=CAE",
    product_id: "4317379970034653275",
    source: "Kitchen Brand Store",
    price: "₹4,205.00",
    extracted_price: 4205.0,
    product_link:
      "https://www.google.com/shopping/product/4317379970034653275?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=4317379970034653275",
    delivery: "Free delivery by Mon, 13 Nov · Free 15-day returns",
    extensions: ["With Steam Wand"],
  },
  {
    position: 93,
    title:
      "WONDERCHEF Regalia Silver Stainless Steel Brew Coffee Maker - 700ml",
    link: "https://www.vijaysales.com/wonderchef-regalia-brew-coffee-maker-with-removable-filter-water-level-indicator-700-ml/22216",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS1HoJERTEavAfr18VphnYiNQo_XhVn5csGSGzdsoz3mminLSRyX3vncdTsggL7DFLSwPAjjdcNcaPLvUZj-wQmqxXisWNGrCLJJjsgv7-DhiCjUo0O8YALIw&usqp=CAE",
    product_id: "10465161172911105502",
    rating: 3.5,
    source: "Vijay Sales",
    price: "₹2,498.00",
    extracted_price: 2498.0,
    number_of_comparisons: "5",
    comparison_link:
      "https://www.google.com/shopping/product/10465161172911105502/offers?q=coffee+machine&num=100&gl=in&hl=en&prds=cid:10465161172911105502,cs:1,eto:2848472799871351914_0,pid:14159932115582584614",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=cid%3A10465161172911105502%2Ccs%3A1%2Ceto%3A2848472799871351914_0%2Cpid%3A14159932115582584614&gl=in&hl=en&num=100&offers=1&product_id=10465161172911105502",
    store_rating: 3.5,
    product_link:
      "https://www.google.com/shopping/product/10465161172911105502?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=10465161172911105502",
    badge: "Trusted Store",
    delivery: "Free delivery by Mon, 6 Nov",
  },
  {
    position: 94,
    title: "La Piccola Piccola Espresso Machine for E.S.E. Pods. Double Polish",
    link: "https://www.cremashop.eu/en/products/la-piccola/piccola/9603?cc=IN_EUR&srsltid=AfmBOooG0mqFVu9H0UqGyvZqjko3-yXXEhKWfemWifT4lK3KoZEYhIUD3Mk",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR6QdrGooxxjPwEfdgJNMeureC5CGE11kd9fLfI3pQY0oZ62rlA8Am-uI49FL3D1zNInkyAETG8g2G0snpKX3PC0n7IQfvhylefNOXZY_qwnKwQRXEpjl0e&usqp=CAE",
    source: "Cremashop.eu",
    price: "₹26,725.83",
    extracted_price: 26725.83,
    alternative_price: {
      price: "€302.42",
      extracted_price: 302.42,
      currency: "EUR",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:9808105427254007843",
    product_id: "9808105427254007843",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=9808105427254007843",
    delivery: "Delivery date and cost shown at checkout · Free 14-day returns",
    extensions: ["Automatic", "Pod Compatible"],
  },
  {
    position: 95,
    title: "Indian Type Coffee Machine with Auto Cut 20 Inch",
    link: "https://yantracart.com/indian-type-coffee-machine-with-auto-cut-20-inch/?srsltid=AfmBOooSumE9K17zQqy6pXJLTDi_QJP7uoiCHqqhqfg72JMTQz8CUMiw7FA",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSbL5Jgsyji8_Tljjkm8tOJO4TSq98rO_7x_MXGpqnAtawHJJvhkAUsqwgDsJj4MevPHPDTTMrbiIV6G_tTPuTwMv-6AxUGAScwJrw-kctbp3Xxi7jcDxf&usqp=CAE",
    source: "Yantracart",
    price: "₹16,950.00",
    extracted_price: 16950.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:13700143127412739332",
    product_id: "13700143127412739332",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=13700143127412739332",
    delivery: "Free delivery by Wed, 8 Nov · Free 7-day returns",
  },
  {
    position: 96,
    title:
      "Jura J8 Bean to Cup Coffee Maker | Best Coffee Machine for Home and Office | Best Imported Coffee Machine in India",
    link: "https://caramelly.in/products/jura-j8-coffee-machine?srsltid=AfmBOopUxnidMVlCvr8tC_oMEbDUhcQEE_JuTcp3jWJ5-eoSr3rSnzqJIEM",
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRDp1aeDo42sfOpMIBxVv8hmsoHmnv3OTghZ-QldWNwDFfFjgL3odp7Q8he27nd9Ezv77HQzqGCnhAT441Qmlw2Mr8DWI2eJbL2nqUd6-SOIJX79qxJLvXUQQ&usqp=CAE",
    rating: 4.8,
    reviews: 49,
    source: "caramelly.in",
    price: "₹3,59,900.00",
    extracted_price: 359900.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:745909843631758986",
    product_id: "745909843631758986",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=745909843631758986",
    delivery: "Free delivery by Mon, 6 Nov",
    extensions: ["Super Automatic", "With Grinder"],
  },
  {
    position: 97,
    title: "Greek Coffee Machine 670W Capacity 250ml - Grey",
    link: "https://www.yiassu.com/product/greek-coffee-machine-670w-capacity-250ml/?attribute_pa_color=grey&utm_source=Google+Shopping&utm_medium=cpc&utm_campaign=YiassuFeed1&srsltid=AfmBOor31b0VT9QEyNGkBW5tD5B7o8oVpje-Mu8MbHNEgmBsvwjyKbwQlOc",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSzWvD8RdCFIfH6dmk1j-a1d1i5AYhpmUKnQfbathcapXos8UV6pW02yIJEziFKPsgFw5ZBCPw1ouwPRk1UsirDAzZQe0z_PAs0ScDK6U8&usqp=CAE",
    source: "Yiassu.com",
    price: "₹10,516.41",
    extracted_price: 10516.41,
    alternative_price: {
      price: "€119.00",
      extracted_price: 119.0,
      currency: "EUR",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:8615724209320459119",
    product_id: "8615724209320459119",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=8615724209320459119",
    delivery: "₹2,739.57 delivery · Free 14-day returns",
  },
  {
    position: 98,
    title: "E1 Prima by Victoria Arduino",
    link: "https://www.coffee.plus/online-store/E1-Prima-by-Victoria-Arduino-p537630734",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTf9nxQ1BsaHshZc6_xuFfpaosG555A_csN-h_PCoyMzRW5SxBCeoqwZWV2fJZNE3a3ZY36kEd5MDtLtnbn1tVshoZdGUlLS_0Nlb9mNfmVD7kEz8JRsc_igw&usqp=CAE",
    product_id: "6880536308859010822",
    rating: 5.0,
    reviews: 3,
    source: "coffee.plus",
    price: "₹4,48,900.00",
    extracted_price: 448900.0,
    product_link:
      "https://www.google.com/shopping/product/6880536308859010822?gl=in",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=6880536308859010822",
    delivery: "Free delivery by Wed, 15 Nov · Free 7-day returns",
    extensions: ["With Steam Wand"],
  },
  {
    position: 99,
    title:
      "Coffee Machine, High Power, 15bar, Electronic Constant Temperature, Espresso Machine, Suitable For Office, Cafe, Home Use",
    link: "https://www.ubuy.com.pt/en/product/2Z48OMT0-coffee-machine-high-power-15bar-electronic-constant-temperature-espresso-machine-suitable-for-office?srsltid=AfmBOooj2DbAi9fYeBDj4ygyZ82Fadtzci-NH5SIwn_7CrtN7TpkwjV_SVM",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT8Gn-VB5iidqnHhO3ZyWWs_1TVlwpnTpsnqYyhUU1_wZzBEdOS-GQxcU1SeS3WFsw7ES2oT6EvbS2-xNhpMN9J3BpXtvx5FDotOugpwbGNxsdd69k23Se2vg&usqp=CAE",
    source: "Ubuy",
    price: "₹65,484.56",
    extracted_price: 65484.56,
    alternative_price: {
      price: "€741.00",
      extracted_price: 741.0,
      currency: "EUR",
    },
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:2104717624474159307",
    product_id: "2104717624474159307",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=2104717624474159307",
    delivery: "₹883.74 delivery by Fri, 10 Nov",
  },
  {
    position: 100,
    title: "4 Option Coffee & Tea Vending Machine",
    link: "https://cafedesireonline.in/products/coffee-tea-vending-machine-4-lane?variant=31347354173578&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoqkfqUYBds-E27gb3KuyeB1AifY9AmK47-_FI1BJhbqNtU4DA-Obps",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQuQK-fgOhCxblQXcH46DSBFdEV79X7UWcIM3l-6tOXkf3UHpN-VW0CkAu8Y0uEXZQKbrKY4KLEA7ywnlm6H5Q_bQg0lNhwQ9cV2VLAT-wLHif7JtZ6UE7pnw&usqp=CAE",
    source: "Cafe Desire",
    price: "₹23,699.00",
    extracted_price: 23699.0,
    product_link:
      "https://www.google.com/shopping/product/1?gl=in&prds=pid:2306654502048050956",
    product_id: "2306654502048050956",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=mobile&engine=google_product&gl=in&google_domain=google.com&hl=en&product_id=2306654502048050956",
    delivery: "Free delivery by Wed, 15 Nov",
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainBody = () => {
  let navigate = useNavigate();
  const [imageSource, setimageSource] = useState(false); // true,false,"loading"
  const [googleLensSesultsStatus, setgoogleLensSesultsStatus] = useState(false); // true,false,"loading"
  const [googleLensResults, setgoogleLensResults] = useState(null);
  const [userInputText, setuserInputText] = useState("");
  const [showErrorSnackbar, setshowErrorSnackbar] = useState(false);

  const handleSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setshowErrorSnackbar(false);
  };

  // ==========Google lens search============
  const { parameterName } = useParams();
  console.log(parameterName);

  const handleSearch = async () => {
    setgoogleLensSesultsStatus("loading");
    try {
      const response = await axios.post("http://127.0.0.1:5000/model", {
        shopping_query: parameterName,
      });
      setgoogleLensResults(response?.data);
      // console.log(response?.data);
      setgoogleLensSesultsStatus(true);
    } catch (error) {
      console.error("Error searching for image:", error);
      setgoogleLensSesultsStatus(false);
    }
  };
  useEffect(() => {
    if (parameterName) {
      handleSearch();
    }
  }, [parameterName]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showErrorSnackbar}
        autoHideDuration={10000}
        onClose={handleSnackbar}
      >
        <Alert onClose={handleSnackbar} severity="error" sx={{ width: "100%" }}>
          please try again !!!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          {/* =========================================================  LEFT COMPONENT ========================================================= */}
          <Grid
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
            item
            pb={1}
          >
            <Grid
              style={{
                height: "80%",
                display: "flex",
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                // background: "red",
              }}
              item
              p={2}
              pt={0}
              pb={1}
            >
              {googleLensSesultsStatus === "loading" ? (
                <UseAnimations
                  fillColor={"rgb(31 31 31)"}
                  strokeColor={"rgb(134 143 152)"}
                  animation={loading2}
                  size={80}
                />
              ) : googleLensSesultsStatus === true ? (
                <ProductsBox productsData={googleLensResults} />
              ) : (
                <div
                  style={{
                    width: "70%",
                    fontSize: "15px",
                    color: "rgb(134 143 152)",
                    fontWeight: "500",
                    textAlign: "justify",
                  }}
                >
                  <p>Welcome to our Sustainify!</p>
                  <p>
                    Discover eco-friendly alternatives that resonate with your
                    values. Our platform empowers you to explore a range of
                    sustainable products curated to make a positive impact on
                    the environment.
                  </p>
                  <p>
                    The upper section showcases a carefully selected assortment
                    of sustainable products—from organic wearables to renewable
                    tech gadgets. Find items that align with your lifestyle and
                    beliefs.
                  </p>

                  <p>
                    Share your preferences in the section below. Let us know
                    what you're seeking—be it a specific category or product
                    type. Your input enables us to tailor recommendations that
                    suit your sustainable choices.
                  </p>
                  <p>
                    By supporting brands committed to sustainability, you're not
                    just making purchases; you're making a statement. Every
                    decision counts towards a greener future for you and the
                    planet.
                  </p>
                </div>
              )}
            </Grid>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paper
                component="form"
                sx={{
                  p: "2px 4px 2px 10px",
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  background: "rgb(24 24 24)",
                  boxShadow: "none",
                }}
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={magicIcon}
                  alt="send"
                />
                <InputBase
                  sx={{ ml: 2, pr: 1, flex: 1, color: "rgb(134 143 152)" }}
                  placeholder="Enter your product name"
                  value={userInputText}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      //call on pressing of enter key
                      event.preventDefault();
                      setuserInputText("");
                    }
                  }}
                  onChange={(event) => {
                    setuserInputText(event.target.value);
                  }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => {
                    navigate(`/results/${userInputText}`);
                    // console.log(userInputText);
                  }}
                >
                  {imageSource === "loading" ? (
                    <UseAnimations
                      animation={infinity}
                      size={24}
                      strokeColor={"#1f88d9"}
                    />
                  ) : (
                    <SendIcon sx={{ color: "#1f88d9" }} />
                  )}
                </IconButton>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainBody;
