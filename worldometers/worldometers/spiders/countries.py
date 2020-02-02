# -*- coding: utf-8 -*-
import scrapy


class CountriesSpider(scrapy.Spider):
    name = 'countries'
    allowed_domains = ['www.worldometers.info']
    start_urls = ['https://www.worldometers.info/world-population/population-by-country/']

    def parse(self, response):
        country_rows = response.xpath("//td/a")

        for country in country_rows:
            name = country.xpath(".//text()").get()
            link = country.xpath(".//@href").get()
            yield {
                'name': name,
                'link': link
            }
