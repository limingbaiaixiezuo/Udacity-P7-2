"use strict"

$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         it('defined URL and have content', function() {
                let url = true;
                function testArray(cv, index, array) {//forEach的回调函数，检测每个数组的元素是否为空
                    if(cv.url.length === 0){
                　       url = false;
                        return;
                    }
                }
                allFeeds.forEach(testArray);
                expect(url).toBe(true);
           });

         it('defined name and have content', function() {
                let name = true;
                function testArray(cv, index, array) {
                        if(cv.name.length === 0){
                                name = false;
                                return;
                        }
                }
                allFeeds.forEach(testArray);
                expect(name).toBe(true);
           });

         });




        describe('The menu', function() {

             it('Hidden by default', function() {
                    expect($("body").hasClass("menu-hidden")).toBe(true);
             });

              it('Show or Hide', function() {
                    $('.icon-list').trigger('click');//执行到该步骤时程序性的触发点击事件
                    expect($("body").hasClass("menu-hidden")).not.toBe(true);
                    $('.icon-list').trigger('click');
                    expect($("body").hasClass("menu-hidden")).toBe(true);
              });
     });

          describe('Initial Entries', function() {

              beforeEach(function(done) {

               loadFeed(1, done);//运行loadFeed函数随便调用一个allFeeds数组中的源
               // done();
               }, 20000);//设置１０秒是为了防止有些加载比较慢而导致超时，进而检测不能通过的问题

             it('.Feed have .entry', function() {

                 expect($(".feed").children().length).toBeGreaterThan(0);

             });
      });

       describe('New Feed Selection', function() {

                let contents1;
                let contents2;

                beforeEach(function(done) {
                        loadFeed(1, function(){//注意第一次调用时不能有done,否则会直接触发it.
                                contents1 = $('.feed').html();//提取第一次调用产生的内容
                                loadFeed(0, function(){//因为每个测例都是独立的，所以需要再次运行loadFeed函数调用一个源
                                        contents2 = $('.feed').html();//提取第二次调用产生的内容
                                        done();
                                });
                      });
                });


                it('Change content when load new', function(done) {
                        expect(contents1).not.toBe(contents2);
                        done();
                });
      });

}());
