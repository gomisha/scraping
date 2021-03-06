# -*- coding: utf-8 -*-
import scrapy


class BestsellersSpider(scrapy.Spider):
    name = 'bestsellers'
    allowed_domains = ['www.glassesshop.com']
    start_urls = ['https://www.glassesshop.com/bestsellers']

    def get_price(self, selector):
        price = selector.xpath(".//div[@class='row']/div[contains(@class, 'pprice')]/span/text()").get()
        # sale price will be in different place and regular price will be blank
        price = price.strip() #sale price will cause this to have whitespace and be blank
        if len(price) < 5:
            #sale price
            price = selector.xpath(".//div[2]/div/span/span/text()").get()
        return price


    def parse(self, response):
        glasses_all = response.xpath("//div[contains(@class, 'm-p-product')]")

        for glasses in glasses_all:
            name = glasses.xpath(".//div[@class='row']/p[contains(@class, 'pname')]/a/text()").get()

            #promo ad - "buy 1 get 1 free" instead of glasses shown sometimes in grid
            if name is None:
                 continue

            price = self.get_price(glasses)
            link = glasses.xpath(".//div[2]/p/a/@href").get()
            image = glasses.xpath(".//div[1]/a/img[1]/@src").get()

            yield {
                'name': name,
                'price': price,
                'link': link,
                'image': image
                #'User-Agent': response.request.headers['User-Agent']
            }

        next_page_link = response.xpath("//a[contains(@aria-label, 'Next')]/@href").get() 
        if next_page_link:
            yield response.follow(url=next_page_link, callback=self.parse)
