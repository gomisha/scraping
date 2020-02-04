# -*- coding: utf-8 -*-
import scrapy

class DealsSpider(scrapy.Spider):
    name = 'deals'
    allowed_domains = ['www.geekbuying.com']
    #start_urls = ['https://www.geekbuying.com/deals']

    def start_requests(self):
        yield scrapy.Request(url='https://www.geekbuying.com/deals', headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
        })

    def parse(self, response):
        products = response.xpath("//div[@class='category_li']")
        for product in products:
            product_name = product.xpath(".//a[@class='category_li_link']/text()").get()
            product_price = product.xpath(".//div[@class='category_li_price']/span/text()").get()
            product_url = product.xpath(".//a[@class='category_li_link']/@href").get()
            quantity = product.xpath(".//div[@class='category_li_clai']/div/span/text()").get()
            header = response.request.headers['User-Agent']

            yield {
                'name': product_name,
                'price': product_price,
                'url': product_url,
                'quantity': quantity,
                'User-Agent': header
            }

        next_page_link = response.xpath("//a[@class='next']/@href").get()
        if next_page_link:
            yield response.follow(url=next_page_link, callback=self.parse, headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
            })