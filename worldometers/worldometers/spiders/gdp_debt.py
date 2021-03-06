# -*- coding: utf-8 -*-
import scrapy


class GdpDebtSpider(scrapy.Spider):
    name = 'gdp_debt'
    allowed_domains = ['worldpopulationreview.com']
    start_urls = ['http://worldpopulationreview.com/countries/countries-by-national-debt/']

    def parse(self, response):
        rows = response.xpath("//table/tbody/tr")
        for row in rows:
            yield {
                'country'    : row.xpath(".//td[1]/a/text()").get(),
                'debt_to_gdp': row.xpath(".//td[2]/text()").get()
            }