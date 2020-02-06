# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class BestMoviesSpider(CrawlSpider):
    name = 'best_movies'
    allowed_domains = ['imdb.com']
    start_urls = ['https://www.imdb.com/search/title/?genres=drama&groups=top_250&sort=user_rating,desc']

    rules = (
        Rule(LinkExtractor(restrict_xpaths=("//h3[@class='lister-item-header']/a")), 
                callback='parse_item', follow=True),
        #next page link
        Rule(LinkExtractor(restrict_xpaths="(//a[@class='lister-page-next next-page'])[1]")),
    )

    def parse_item(self, response):
        print (response.url)
        yield {
            'title':    response.xpath("//div[@class='title_wrapper']/h1/text()").get().strip(),
            'year':     response.xpath("//span[@id='titleYear']/a/text()").get(),
            'rating':   response.xpath("//span[@itemprop='ratingValue']/text()").get(),
            'duration': response.xpath("normalize-space(//time[1]/text())").get(),
            'genre':    response.xpath("//div[@class='subtext']/a[1]/text()").get(),
            'url':      response.url
        }
