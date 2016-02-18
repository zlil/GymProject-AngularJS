/**
 * Created by Zlil on 17/02/2016.
 */
/**
 * Created by Zlil on 16/02/2016.
 */

angular.module('views.news', [])
    .controller('newsCtrl',[ '$scope','news', function ($scope, news) {
        /*  var newsdata = [];
         $scope.getNews = function(){
         $scope.newsdata = news.getNewsRss();
         console.log("news data rss: " + $scope.newsdata);
         }*/
        /* $scope.newsdata=newsDataRss;
         console.log("scope news data: " +$scope.newsdata);*/

        $scope.getNews = function(){
            var newsFeed = [];
            console.log("rss feed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            var feedurl="http://www.ynet.co.il/Integration/StoryRss1854.xml";
            var feedlimit=9;
            var rssoutput="Latest Slashdot News:";

            console.log("rss feed 2");
            var feedpointer=new google.feeds.Feed(feedurl); //Google Feed API method
            feedpointer.setNumEntries(feedlimit);//Google Feed API method
            feedpointer.load(displayfeed); //Google Feed API method


            function displayfeed(result){
                if (!result.error){
                    var thefeeds=result.feed.entries
                    for (var i=0; i<thefeeds.length; i++){

                        newsFeed.push({
                            'title': thefeeds[i].title,
                            'link': thefeeds[i].link
                        });

                    }
                    console.log(newsFeed);
                    $scope.newsFeed=newsFeed;

                }
                else
                    alert("Error fetching feeds!")
            }

        };

    }]);