# -*- coding: utf-8 -*-
import scrapy


class DealsSpider(scrapy.Spider):
    name = 'deals'
    allowed_domains = ['www.geekbuying.com']
    start_urls = ['https://www.geekbuying.com/deals']

    def parse(self, response):
        products = response.xpath("//div[@class='category_li']")
        for product in products:
            product_name = product.xpath(".//a[@class='category_li_link']/text()").get()
            product_price = product.xpath(".//div[@class='category_li_price']/span/text()").get()
            product_url = product.xpath(".//a[@class='category_li_link']/@href").get()
            quantity = product.xpath(".//div[@class='category_li_clai']/div/span/text()").get()

            yield {
                'name': product_name,
                'price': product_price,
                'url': product_url,
                'quantity': quantity
            }

        next_page_link = response.xpath("//a[@class='next']/@href").get()
        if next_page_link:
            yield response.follow(url=next_page_link, callback=self.parse)