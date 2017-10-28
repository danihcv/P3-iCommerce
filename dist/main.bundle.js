webpackJsonp([1,4],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_cookie_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(http, cookieService, router) {
        this.http = http;
        this.cookieService = cookieService;
        this.router = router;
        this.networkUrl = 'https://the-dank-network.herokuapp.com/api';
        this.url = 'https://icommerce-api.herokuapp.com/api';
    }
    UserService.prototype.getCEP = function (cep) {
        return this.http.get('http://api.postmon.com.br/v1/cep/' + cep)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getLoggedUser = function () {
        return this.user;
    };
    UserService.prototype.login = function (user) {
        return this.http.post(this.networkUrl + '/login', user)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.createAuthorizationHeader = function (headers, token) {
        headers.append('Authorization', token);
    };
    UserService.prototype.loginByToken = function (token) {
        var _this = this;
        this.getUserFromNetwork(token)
            .subscribe(function (netUser) { return _this.setLoggedUser(netUser); }, function (err) { return _this.cookieService.delete('token'); });
    };
    UserService.prototype.getUser = function (username) {
        return this.http.get(this.url + '/user/' + username)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.setLoggedUser = function (obj, updateToken) {
        var _this = this;
        if (updateToken) {
            console.log(obj['token_type'] + obj['access_token']);
            this.cookieService.set('token', obj['token_type'] + ' ' + obj['access_token']);
        }
        this.getUser(obj.username)
            .subscribe(function (user) { return _this.user = user; }, function (err) {
            _this.http.post(_this.url + '/user', { 'username': obj.username })
                .map(function (res) { return res.json(); })
                .subscribe(function (user) { return _this.user = user; }, function (errr) { return _this.cookieService.delete('token'); });
        });
    };
    UserService.prototype.isLogged = function () {
        return this.user !== undefined;
    };
    UserService.prototype.isAdmin = function () {
        if (this.isLogged()) {
            return this.user.isAdmin;
        }
        return false;
    };
    UserService.prototype.hasCEP = function () {
        return this.user.CEP !== null;
    };
    UserService.prototype.ostentar = function (purchase) {
        var obj = {
            'description': 'Saudações, PLEBEUS!\nVenho por meio deste trazer-vos à luz minhas novas aquisições:\n'
        };
        for (var _i = 0, _a = purchase.products; _i < _a.length; _i++) {
            var p = _a[_i];
            obj.description += '\tItem: ' + p.name + '\n' +
                '\tPreço: ' + p.price + '\n' +
                '\tQuantidade: ' + p.quantity + '\n' +
                '-------------------------\n';
        }
        obj.description += 'PREÇO TOTAL: R$ ' + purchase.totalPrice + '\n\nSIM! Sou rico.\nNão me inveje, trabalhe!\n#gratidão';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.cookieService.get('token') });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        this.http.post(this.networkUrl + '/user/post', obj, options)
            .subscribe(function (data) { return alert('Ostentou!'); }, function (err) { return alert('Falha na ostentação'); });
    };
    UserService.prototype.getUserFromNetwork = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.cookieService.get('token') });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.networkUrl + '/user', options)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.updateUser = function (obj) {
        return this.http.put(this.url + '/user/' + obj.username, obj);
    };
    UserService.prototype.logout = function () {
        this.cookieService.delete('token');
        this.user = undefined;
        this.router.navigate(['/']);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_cookie_service__["a" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_cookie_service__["a" /* CookieService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], UserService);

var _a, _b, _c;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_checkout_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(checkoutService, router, route, cookieService, userService) {
        this.checkoutService = checkoutService;
        this.router = router;
        this.route = route;
        this.cookieService = cookieService;
        this.userService = userService;
        this.searchValue = '';
        var token = this.cookieService.get('token');
        if (token !== '') {
            this.userService.loginByToken(token);
        }
    }
    AppComponent.prototype.getCheckoutCount = function () {
        return this.checkoutService.getCheckoutProductsCount();
    };
    AppComponent.prototype.isLogged = function () {
        return this.userService.isLogged();
    };
    AppComponent.prototype.isAdmin = function () {
        // console.log('admin', this.userService.isAdmin());
        return this.userService.isAdmin();
    };
    AppComponent.prototype.logout = function () {
        this.userService.logout();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(171)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_checkout_service__["a" /* CheckoutService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_checkout_service__["a" /* CheckoutService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__["a" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__["a" /* CookieService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home_home_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_update_product_new_product_new_product_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_view_product_view_product_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_search_search_product_search_product_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_search_search_category_search_category_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_search_search_popularity_search_popularity_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_update_product_edit_product_edit_product_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_checkout_checkout_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_checkout_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_register_user_register_user_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_cookie_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_update_product_new_product_new_product_component__["a" /* NewProductComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_view_product_view_product_component__["a" /* ViewProductComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_search_search_product_search_product_component__["a" /* SearchProductComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_search_search_category_search_category_component__["a" /* SearchCategoryComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_search_search_popularity_search_popularity_component__["a" /* SearchPopularityComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_update_product_edit_product_edit_product_component__["a" /* EditProductComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_checkout_checkout_component__["a" /* CheckoutComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_register_user_register_user_component__["a" /* RegisterUserComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot([
                { path: '', component: __WEBPACK_IMPORTED_MODULE_6__components_home_home_component__["a" /* HomeComponent */] },
                { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */] },
                { path: 'register', component: __WEBPACK_IMPORTED_MODULE_17__components_register_user_register_user_component__["a" /* RegisterUserComponent */] },
                { path: 'checkout', component: __WEBPACK_IMPORTED_MODULE_15__components_checkout_checkout_component__["a" /* CheckoutComponent */] },
                { path: 'newProduct', component: __WEBPACK_IMPORTED_MODULE_8__components_update_product_new_product_new_product_component__["a" /* NewProductComponent */] },
                { path: 'editProduct/:id', component: __WEBPACK_IMPORTED_MODULE_14__components_update_product_edit_product_edit_product_component__["a" /* EditProductComponent */] },
                { path: 'product/:id', component: __WEBPACK_IMPORTED_MODULE_9__components_view_product_view_product_component__["a" /* ViewProductComponent */] },
                { path: 'search/category/:term', component: __WEBPACK_IMPORTED_MODULE_12__components_search_search_category_search_category_component__["a" /* SearchCategoryComponent */] },
                { path: 'search/product/:term', component: __WEBPACK_IMPORTED_MODULE_11__components_search_search_product_search_product_component__["a" /* SearchProductComponent */] },
                { path: 'search/popularity', component: __WEBPACK_IMPORTED_MODULE_13__components_search_search_popularity_search_popularity_component__["a" /* SearchPopularityComponent */] },
                { path: '**', redirectTo: '' }
            ])
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__services_product_service__["a" /* ProductService */],
            __WEBPACK_IMPORTED_MODULE_16__services_checkout_service__["a" /* CheckoutService */],
            __WEBPACK_IMPORTED_MODULE_18__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_19_ngx_cookie_service__["a" /* CookieService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_checkout_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CheckoutComponent = (function () {
    function CheckoutComponent(route, router, checkoutService, titleService, userService) {
        this.route = route;
        this.router = router;
        this.checkoutService = checkoutService;
        this.titleService = titleService;
        this.userService = userService;
        this.products = [];
        this.totalPrice = 0;
        if (!this.userService.isLogged()) {
            this.router.navigate(['/login']);
        }
        this.titleService.setTitle('iCommerce - Carrinho');
        this.products = this.checkoutService.getProductsToCheckout();
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.qnt > p.stock) {
                p.qnt = p.stock;
            }
            this.totalPrice += (p.price * p.qnt);
        }
    }
    CheckoutComponent.prototype.ngOnInit = function () { };
    CheckoutComponent.prototype.recalculateTotalPrice = function () {
        var tPrice = 0;
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var p = _a[_i];
            tPrice += (p.price * p.qnt);
        }
        this.totalPrice = tPrice;
    };
    CheckoutComponent.prototype.remove = function (id) {
        this.products = this.checkoutService.removeProductFromCheckout(id);
        //    this.products.splice(idx, 1);
        this.recalculateTotalPrice();
    };
    CheckoutComponent.prototype.hasProducts = function () {
        return this.products.length > 0;
    };
    CheckoutComponent.prototype.checkout = function () {
        var _this = this;
        if (!this.userService.hasCEP()) {
            alert('Por favor, cadastre seus dados pessoais para o envio.');
            return this.router.navigate(['/register']);
        }
        this.checkoutService.checkout({
            'username': this.userService.getLoggedUser().username,
            'totalPrice': this.totalPrice,
            'date': this.formatDate(new Date()),
            'products': this.getProductsIDs()
        }).subscribe(function () {
            _this.checkoutService.resetCheckout();
            alert('Compra efetuada com sucesso!');
            _this.router.navigate(['/']);
        }, function () { return alert('Algo deu errado!\nPor favor tente novamente mais tarde.'); });
    };
    CheckoutComponent.prototype.getProductsIDs = function () {
        var ids = [];
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var p = _a[_i];
            ids.push({ 'idProduct': p.id, 'quantity': p.qnt });
        }
        return ids;
    };
    CheckoutComponent.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    };
    return CheckoutComponent;
}());
CheckoutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-checkout',
        template: __webpack_require__(172)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_checkout_service__["a" /* CheckoutService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_checkout_service__["a" /* CheckoutService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["d" /* Title */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _e || Object])
], CheckoutComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=checkout.component.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(productService, titleService, userService) {
        var _this = this;
        this.productService = productService;
        this.titleService = titleService;
        this.userService = userService;
        this.categories = [];
        this.newProducts = [];
        this.topProducts = [];
        this.topLatestPurchases = [];
        this.isDownloading = false;
        this.titleService.setTitle('iCommerce - Home');
        productService.getCategories(5)
            .subscribe(function (data) {
            _this.categories = data;
        });
        productService.getNewerProducts(5)
            .subscribe(function (data) {
            _this.newProducts = data;
        });
        productService.getTopRecommendedProducts(5)
            .subscribe(function (data) {
            _this.topProducts = data;
        });
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.isLogged = function () {
        return this.userService.isLogged();
    };
    HomeComponent.prototype.ostentar = function (purch) {
        this.userService.ostentar(purch);
    };
    HomeComponent.prototype.getTopLatestPurchases = function () {
        var _this = this;
        if (this.userService.isLogged() && !this.isDownloading) {
            this.isDownloading = true;
            this.productService.getTopLatestPurchases(this.userService.getLoggedUser().username)
                .subscribe(function (data) {
                _this.topLatestPurchases = data;
            });
        }
        return this.topLatestPurchases;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__(173)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_product_service__["a" /* ProductService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["d" /* Title */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(router, titleService, userService, cookieService) {
        this.router = router;
        this.titleService = titleService;
        this.userService = userService;
        this.cookieService = cookieService;
        this.obj = {
            'username': '',
            'password': ''
        };
        this.gotError = false;
        this.titleService.setTitle('iCommerce - Login');
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.gotError = false;
        this.userService.login(this.obj).subscribe(function (netUser) {
            _this.userService.setLoggedUser(netUser, true);
            _this.router.navigate(['/']);
        }, function (err) { return _this.gotError = true; });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__(174)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["d" /* Title */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__["a" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__["a" /* CookieService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_cookie_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterUserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterUserComponent = (function () {
    function RegisterUserComponent(userService, titleService, router, cookieService) {
        this.userService = userService;
        this.titleService = titleService;
        this.router = router;
        this.cookieService = cookieService;
        /*
        cep: number;
        number: number = null;
        details = '';
        */
        this.address = {
            'state': undefined,
            'city': undefined,
            'neighborhood': undefined,
            'street': undefined
        };
        this.titleService.setTitle('iCommerce - Registro');
        if (!this.userService.isLogged()) {
            this.router.navigate(['/']);
        }
        else {
            this.user = this.userService.getLoggedUser();
            /*console.log(u);
            this.cep = u.CEP;
            this.number = u.number;
            this.details = u.complement;*/
            this.checkCEP();
        }
    }
    RegisterUserComponent.prototype.ngOnInit = function () {
    };
    RegisterUserComponent.prototype.checkCEP = function () {
        var _this = this;
        this.userService.getCEP(this.user.CEP)
            .subscribe(function (data) {
            _this.isCEPValid = true;
            _this.address.state = data.estado;
            _this.address.city = data.cidade;
            _this.address.neighborhood = data.bairro;
            _this.address.street = data.logradouro;
        }, function () { return _this.isCEPValid = false; });
    };
    RegisterUserComponent.prototype.resetData = function () {
        this.isCEPValid = undefined;
        for (var k in this.address) {
            this.address[k] = undefined;
        }
    };
    RegisterUserComponent.prototype.submit = function () {
        var _this = this;
        if (!this.isCEPValid) {
            alert('Revise o CEP informado!');
        }
        else if (this.user.number === null) {
            alert('Informe o número da residência');
        }
        else if (this.user.complement === '') {
            alert('Informe o tipo de residência e/ou detalhes adicionais');
        }
        else {
            this.userService.updateUser(this.user).subscribe(function (data) {
                alert('Dados atualizados com sucesso!');
                _this.router.navigate(['']);
            }, function (err) { return alert('Erro ao atualizar dados!'); });
        }
    };
    return RegisterUserComponent;
}());
RegisterUserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-register-user',
        template: __webpack_require__(175)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["d" /* Title */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_cookie_service__["a" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_cookie_service__["a" /* CookieService */]) === "function" && _d || Object])
], RegisterUserComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=register-user.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_model__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchCategoryComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchCategoryComponent = (function (_super) {
    __extends(SearchCategoryComponent, _super);
    function SearchCategoryComponent(route, productService, titleService) {
        var _this = _super.call(this, titleService) || this;
        _this.route = route;
        _this.productService = productService;
        _this.titleService = titleService;
        _this.type = 'categoria';
        route.params.subscribe(function (params) {
            _this.term = params['term'];
            productService.getProductsByCategory(_this.term)
                .subscribe(function (data) {
                _this.products = data;
            });
        });
        return _this;
    }
    SearchCategoryComponent.prototype.ngOnInit = function () {
    };
    return SearchCategoryComponent;
}(__WEBPACK_IMPORTED_MODULE_1__search_model__["a" /* SearchModel */]));
SearchCategoryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-search-category',
        template: __webpack_require__(55)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_product_service__["a" /* ProductService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */]) === "function" && _c || Object])
], SearchCategoryComponent);

var _a, _b, _c;
//# sourceMappingURL=search-category.component.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_model__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPopularityComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchPopularityComponent = (function (_super) {
    __extends(SearchPopularityComponent, _super);
    function SearchPopularityComponent(productService, titleService) {
        var _this = _super.call(this, titleService) || this;
        _this.productService = productService;
        _this.titleService = titleService;
        _this.type = 'popularidade';
        _this.term = 'decrescente';
        productService.getTopRecommendedProducts()
            .subscribe(function (data) {
            _this.products = data;
        });
        return _this;
    }
    SearchPopularityComponent.prototype.ngOnInit = function () {
    };
    return SearchPopularityComponent;
}(__WEBPACK_IMPORTED_MODULE_1__search_model__["a" /* SearchModel */]));
SearchPopularityComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-search-popularity',
        template: __webpack_require__(55)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_product_service__["a" /* ProductService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["d" /* Title */]) === "function" && _b || Object])
], SearchPopularityComponent);

var _a, _b;
//# sourceMappingURL=search-popularity.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_model__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchProductComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchProductComponent = (function (_super) {
    __extends(SearchProductComponent, _super);
    function SearchProductComponent(route, productService, titleService) {
        var _this = _super.call(this, titleService) || this;
        _this.route = route;
        _this.productService = productService;
        _this.titleService = titleService;
        _this.type = 'produto';
        route.params.subscribe(function (params) {
            _this.term = params['term'];
            productService.getObjectsByName(_this.term)
                .subscribe(function (data) {
                _this.products = data;
            });
        });
        return _this;
    }
    SearchProductComponent.prototype.ngOnInit = function () {
    };
    return SearchProductComponent;
}(__WEBPACK_IMPORTED_MODULE_3__search_model__["a" /* SearchModel */]));
SearchProductComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-search-product',
        template: __webpack_require__(55)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_product_service__["a" /* ProductService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */]) === "function" && _c || Object])
], SearchProductComponent);

var _a, _b, _c;
//# sourceMappingURL=search-product.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__update_product__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProductComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditProductComponent = (function (_super) {
    __extends(EditProductComponent, _super);
    function EditProductComponent(productService, router, route, titleService, userService) {
        var _this = _super.call(this, productService, router, userService) || this;
        _this.productService = productService;
        _this.router = router;
        _this.route = route;
        _this.titleService = titleService;
        _this.userService = userService;
        _this.titleService.setTitle('iCommerce - Editar produto');
        _this.action = 'Salvar';
        _this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.productService.getProduct(_this.id).subscribe(function (data) {
                _this.name = data.name;
                _this.description = data.description;
                _this.image = data.image;
                _this.category = data.category;
                _this.price = data.price;
                _this.stock = data.stock;
            });
        });
        return _this;
    }
    EditProductComponent.prototype.ngOnInit = function () { };
    EditProductComponent.prototype.submit = function () {
        var _this = this;
        this.productService.updateProduct({ 'id': this.id, 'name': this.name, 'image': this.image, 'description': this.description,
            'price': this.price, 'category': this.createNewCategory ? this.newCategory : this.category, 'stock': this.stock })
            .subscribe(function () { return _this.router.navigate(['']); }, function (err) {
            var res = JSON.parse(err._body);
            _this.resetErrors();
            for (var k in res) {
                _this.gotError[k] = true;
            }
        });
    };
    return EditProductComponent;
}(__WEBPACK_IMPORTED_MODULE_1__update_product__["a" /* UpdateProduct */]));
EditProductComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-edit-product',
        template: __webpack_require__(80)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_product_service__["a" /* ProductService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _e || Object])
], EditProductComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=edit-product.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__update_product__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProductComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NewProductComponent = (function (_super) {
    __extends(NewProductComponent, _super);
    function NewProductComponent(productService, router, titleService, userService) {
        var _this = _super.call(this, productService, router, userService) || this;
        _this.productService = productService;
        _this.router = router;
        _this.titleService = titleService;
        _this.userService = userService;
        _this.titleService.setTitle('iCommerce - Criar produto');
        _this.action = 'Criar';
        return _this;
    }
    NewProductComponent.prototype.ngOnInit = function () { };
    NewProductComponent.prototype.submit = function () {
        var _this = this;
        this.productService.createProduct({ 'name': this.name, 'image': this.image, 'description': this.description,
            'price': this.price, 'category': this.createNewCategory ? this.newCategory : this.category, 'stock': this.stock })
            .subscribe(function () { return _this.router.navigate(['']); }, function (err) {
            var res = JSON.parse(err._body);
            _this.resetErrors();
            for (var k in res) {
                _this.gotError[k] = true;
            }
        });
    };
    return NewProductComponent;
}(__WEBPACK_IMPORTED_MODULE_3__update_product__["a" /* UpdateProduct */]));
NewProductComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-new-product',
        template: __webpack_require__(80)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_product_service__["a" /* ProductService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _d || Object])
], NewProductComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=new-product.component.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_product_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_checkout_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewProductComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ViewProductComponent = (function () {
    function ViewProductComponent(router, route, productService, checkoutService, titleService, userService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.productService = productService;
        this.checkoutService = checkoutService;
        this.titleService = titleService;
        this.userService = userService;
        this.qnt = 1;
        this.deleteOption = 'Excluir';
        route.params.subscribe(function (value) {
            _this.id = +value['id'];
            productService.getProduct(_this.id).subscribe(function (data) {
                _this.product = data;
                _this.titleService.setTitle('iCommerce - ' + _this.product.name);
                if (!_this.product.isAvailable) {
                    _this.deleteOption = 'Restaurar';
                }
            }, function (err) { return router.navigate(['/']); });
        });
    }
    ViewProductComponent.prototype.ngOnInit = function () { };
    ViewProductComponent.prototype.addToCheckout = function () {
        if (this.hasStock()) {
            if (!Number.isInteger(this.qnt) || this.qnt <= 0) {
                alert('Por favor, verifique a quantidade informada!');
            }
            else if (this.qnt > this.product.stock) {
                alert('Não temos tudo isso em estoque.\n:(');
            }
            else if (this.qnt > 0) {
                this.checkoutService.addProductToCheckout(this.product, this.qnt);
            }
        }
    };
    ViewProductComponent.prototype.hasStock = function () {
        return this.product !== undefined && this.product.stock > 0;
    };
    ViewProductComponent.prototype.deleteProduct = function () {
        var _this = this;
        this.productService.deleteProduct(this.id)
            .subscribe(function () { return _this.router.navigate(['/']); });
    };
    ViewProductComponent.prototype.isAdmin = function () {
        return this.userService.isAdmin();
    };
    return ViewProductComponent;
}());
ViewProductComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-view-product',
        template: __webpack_require__(176)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_product_service__["a" /* ProductService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_product_service__["a" /* ProductService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_checkout_service__["a" /* CheckoutService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_checkout_service__["a" /* CheckoutService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["d" /* Title */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _f || Object])
], ViewProductComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=view-product.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.url = 'https://icommerce-api.herokuapp.com/api';
    }
    ProductService.prototype.getProduct = function (id) {
        return this.http.get(this.url + '/product/' + id)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getCategoryList = function () {
        return this.http.get(this.url + '/allCategories')
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.createProduct = function (obj) {
        return this.http.post(this.url + '/product', obj)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getObjectsByName = function (name) {
        return this.http.get(this.url + '/search/name/' + name)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getCategories = function (count) {
        return this.http.get(this.url + '/allCategories/' + count)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getNewerProducts = function (count) {
        return this.http.get(this.url + '/allProducts/' + count)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getTopLatestPurchases = function (username) {
        return this.http.get(this.url + '/latestPurchases/' + username + '/5')
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getProductsByCategory = function (term) {
        return this.http.get(this.url + '/search/category/' + term)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.getTopRecommendedProducts = function (count) {
        if (count !== undefined) {
            return this.http.get(this.url + '/search/popular/' + count)
                .map(function (res) { return res.json(); });
        }
        return this.http.get(this.url + '/search/popular')
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.updateProduct = function (obj) {
        return this.http.put(this.url + '/product', obj)
            .map(function (res) { return res.json(); });
    };
    ProductService.prototype.deleteProduct = function (id) {
        return this.http.delete(this.url + '/product/' + id)
            .map(function (res) { return res.json(); });
    };
    return ProductService;
}());
ProductService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], ProductService);

var _a;
//# sourceMappingURL=product.service.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <nav class=\"navbar\">\r\n    <div class=\"logo\">\r\n      <a [routerLink]=\"['/']\">\r\n        <img src=\"../assets/images/logo-icommerce.png\" height=\"50px\">\r\n      </a>\r\n    </div>\r\n    <div class=\"container\">\r\n      <div class=\"input-group\">\r\n        <input name=\"searchBar\" class=\"form-control\" placeholder=\"Buscar...\" aria-describedby=\"basic-addon1\" [(ngModel)]=\"searchValue\">\r\n        <span class = \"input-group-btn\">\r\n            <button class = \"btn btn-default\" type = \"button\" [routerLink]=\"['search', 'product', searchValue]\">\r\n               <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <button type=\"button\" class=\"btn btn-default\" [routerLink]=\"['/register']\" *ngIf=\"isLogged()\">Conta</button>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"logout()\" *ngIf=\"isLogged()\">Logout</button>\r\n    <button type=\"button\" class=\"btn btn-default\" [routerLink]=\"['/login']\" *ngIf=\"!isLogged()\">Login</button>\r\n    <button type=\"button\" class=\"btn btn-info\" [routerLink]=\"['/checkout']\">Carrinho <small>({{ getCheckoutCount() }})</small></button>\r\n    <button type=\"button\" class=\"btn btn-success\" [routerLink]=\"['/newProduct']\" *ngIf=\"isAdmin()\">+Novo produto</button>\r\n  </nav>\r\n</header>\r\n\r\n<ol class=\"breadcrumb\">\r\n  <li><a [routerLink]=\"['/']\">Home</a></li>\r\n</ol>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

module.exports = "<div id=\"checkout\">\r\n  <h1>Carrinho</h1>\r\n\r\n  <div *ngIf=\"hasProducts()\">\r\n    <div class=\"media media-64\" *ngFor=\"let prod of products; let i = index\">\r\n      <div class=\"media-left\">\r\n        <a [routerLink]=\"['/product', prod.id]\">\r\n          <img class=\"media-object\" src=\"{{ prod.image }}\" height=\"64px\">\r\n        </a>\r\n      </div>\r\n      <div class=\"media-body\">\r\n        <h4 class=\"media-heading\">\r\n          <a [routerLink]=\"['/product', prod.id]\">\r\n            {{ prod.name }}\r\n          </a>\r\n          | {{ prod.price | currency:'BRL':true:'1.2-2' }}\r\n        </h4>\r\n        <input type=\"number\" name=\"quantity\" min=\"1\" [max]=\"prod.stock\" onkeydown=\"return false\"\r\n               [(ngModel)]=\"prod.qnt\" (change)=\"recalculateTotalPrice()\">\r\n        <span class=\"price\">{{ prod.price * prod.qnt | currency:'BRL':true:'1.2-2' }}</span>\r\n      </div>\r\n      <div class=\"media-right\">\r\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"remove(prod.id)\">Remover</button>\r\n      </div>\r\n    </div>\r\n    <h2>\r\n      {{ totalPrice | currency:'BRL':true:'1.2-2' }}\r\n    </h2>\r\n    <button type=\"button\" class=\"btn btn-success\" (click)=\"checkout()\">Comprar</button>\r\n  </div>\r\n  <div *ngIf=\"!hasProducts()\">\r\n    <h3>Não há produtos no carrinho.</h3>\r\n    <button type=\"button\" class=\"btn btn-success\" [routerLink]=\"['/']\">Vá às compras!</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

module.exports = "<div id=\"home\">\r\n  <div class=\"container\">\r\n    <div class=\"panel panel-default float-left width_200\">\r\n      <!-- Default panel contents -->\r\n      <div class=\"panel-heading\">Categorias</div>\r\n      <!-- List group -->\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item\" *ngFor=\"let cat of categories\">\r\n          <a [routerLink]=\"['search', 'category', cat]\">{{ cat }}</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default float-right width_200\">\r\n      <!-- Default panel contents -->\r\n      <div class=\"panel-heading\"><a [routerLink]=\"['search', 'popularity']\">Recomendados</a></div>\r\n      <!-- List group -->\r\n      <ul class=\"list-group\">\r\n        <li class=\"list-group-item\" *ngFor=\"let prod of topProducts\">\r\n          <div class=\"media\">\r\n            <div class=\"media-left\">\r\n              <a>\r\n                <img class=\"media-object\" src=\"{{ prod.image }}\" height=\"64px\" (click)=\"redirect('/product/' + prod.id)\">\r\n              </a>\r\n            </div>\r\n            <div class=\"media-body\">\r\n              <h4 class=\"media-heading\">\r\n                <a [routerLink]=\"['product', prod.id]\">{{ prod.name }}</a>\r\n              </h4>\r\n              <span class=\"price\">{{ prod.price | currency:'BRL':true:'1.2-2' }}</span>\r\n            </div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <div id=\"slider1\" class=\"csslider infinity\">\r\n      <input type=\"radio\" name=\"slides\" id=\"slides_1\">\r\n      <input type=\"radio\" name=\"slides\" id=\"slides_2\">\r\n      <input type=\"radio\" name=\"slides\" checked=\"checked\" id=\"slides_3\">\r\n      <input type=\"radio\" name=\"slides\" id=\"slides_4\">\r\n      <input type=\"radio\" name=\"slides\" id=\"slides_5\">\r\n      <ul>\r\n        <li *ngFor=\"let item of newProducts\">\r\n          <div class=\"heading\">\r\n            <span class=\"title\"><a [routerLink]=\"['/product', item.id]\">{{ item.name }}</a></span>\r\n            <span class=\"description\">{{ item.description }}</span>\r\n          </div>\r\n          <!--<img class=\"background\" src=\"{{ item.image }}\" width=\"100%\">-->\r\n          <img src=\"{{ item.image }}\" height=\"100%\">\r\n        </li>\r\n      </ul>\r\n      <div class=\"arrows\">\r\n        <label for=\"slides_1\"></label>\r\n        <label for=\"slides_2\"></label>\r\n        <label for=\"slides_3\"></label>\r\n        <label for=\"slides_4\"></label>\r\n        <label for=\"slides_5\"></label>\r\n        <label for=\"slides_1\" class=\"goto-first\"></label>\r\n        <label for=\"slides_5\" class=\"goto-last\"></label>\r\n      </div>\r\n      <div class=\"navigation\">\r\n        <div>\r\n          <label for=\"slides_1\"></label>\r\n          <label for=\"slides_2\"></label>\r\n          <label for=\"slides_3\"></label>\r\n          <label for=\"slides_4\"></label>\r\n          <label for=\"slides_5\"></label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"lastPurchases\" class=\"panel panel-default block\" *ngIf=\"isLogged()\">\r\n      <!-- Default panel contents -->\r\n      <div class=\"panel-heading\">Últimas compras</div>\r\n      <!-- List group -->\r\n      <ul class=\"list-group text-align_left\">\r\n        <li class=\"list-group-item\" *ngFor=\"let purchase of getTopLatestPurchases()\">\r\n          <label><span class=\"price\">{{ purchase.totalPrice | currency:'BRL':true:'1.2-2' }}</span></label>\r\n          <button type=\"button\" class=\"btn btn-success\" (click)=\"ostentar(purchase)\">Ostentar</button>\r\n          <div class=\"media\" *ngFor=\"let item of purchase.products\">\r\n            <div class=\"media-left\">\r\n              <a [routerLink]=\"['product', item.id]\">\r\n                <img class=\"media-object\" src=\"{{ item.image }}\" height=\"64px\">\r\n              </a>\r\n            </div>\r\n            <div class=\"media-body\">\r\n              <h4 class=\"media-heading\">\r\n                <a [routerLink]=\"['product', item.id]\">{{ item.name }}</a> <small>x {{ item.quantity }}</small>\r\n              </h4>\r\n              <span class=\"price\">{{ item.price | currency:'BRL':true:'1.2-2' }}</span>\r\n            </div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page\">\r\n  <div class=\"form\">\r\n    <form class=\"login-form\">\r\n      <input type=\"text\" placeholder=\"username\" name=\"username\" [(ngModel)]=\"obj.username\"/>\r\n      <input type=\"password\" placeholder=\"password\" name=\"password\" [(ngModel)]=\"obj.password\"/>\r\n      <button type=\"submit\" (click)=\"submit()\">login</button>\r\n      <p class=\"message\">Not registered? <a href=\"https://the-dank-network.herokuapp.com\">Create an account</a></p>\r\n    </form>\r\n    <div class=\"alert alert-danger\" [hidden]=\"!gotError\" style=\"margin: 20px 0 0 0\">\r\n      <strong>Oops!</strong> Usuário e/ou senha inválidos.\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

module.exports = "<div id=\"register\">\n  <form class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label for=\"disabledInput\" class=\"col-sm-2 control-label\">Nome</label>\n      <div class=\"col-sm-8\">\n        <input class=\"form-control\" id=\"disabledInput\" type=\"text\" disabled name=\"name\" [(ngModel)]=\"name\">\n      </div>\n    </div>\n    <div class=\"form-group has-feedback\" [class.has-success]=\"isCEPValid\" [class.has-error]=\"isCEPValid === false\">\n      <label class=\"col-sm-2 control-label\">CEP</label>\n      <div class=\"col-sm-8\">\n        <input class=\"form-control\" id=\"focusedInput\" type=\"number\" name=\"cep\"\n               [(ngModel)]=\"user.CEP\" (blur)=\"checkCEP()\" (focus)=\"resetData()\">\n        <span class=\"glyphicon form-control-feedback\" [class.glyphicon-ok]=\"isCEPValid\" [class.glyphicon-remove]=\"isCEPValid === false\"></span>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"disabledInput\" class=\"col-sm-2 control-label\" >Estado</label>\n      <div class=\"col-sm-2\">\n        <input class=\"form-control\" type=\"text\" name=\"estado\" disabled\n               [(ngModel)]=\"address.state\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"disabledInput\" class=\"col-sm-2 control-label\" >Cidade</label>\n      <div class=\"col-sm-5\">\n        <input class=\"form-control\" type=\"text\" name=\"cidade\" disabled\n               [(ngModel)]=\"address.city\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"disabledInput\" class=\"col-sm-2 control-label\" >Bairro</label>\n      <div class=\"col-sm-8\">\n        <input class=\"form-control\" type=\"text\" name=\"bairro\" disabled\n               [(ngModel)]=\"address.neighborhood\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"disabledInput\" class=\"col-sm-2 control-label\" >Logradouro</label>\n      <div class=\"col-sm-8\">\n        <input class=\"form-control\" type=\"text\" name=\"rua\" disabled\n               [(ngModel)]=\"address.street\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">Número</label>\n      <div class=\"col-sm-2\">\n        <input class=\"form-control\" type=\"number\" name=\"number\"\n               [(ngModel)]=\"user.number\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">Complemento</label>\n      <div class=\"col-sm-8\">\n        <textarea class=\"form-control\" name=\"complemento\"\n                  [(ngModel)]=\"user.complement\"></textarea>\n      </div>\n    </div>\n    <div class=\"centralize-button\">\n      <button (click)=\"submit()\" class=\"btn btn-success\" aria-haspopup=\"true\">Salvar</button>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

module.exports = "<div id=\"viewProduct\" class=\"cont\">\r\n  <div class=\"center-left half\">\r\n    <img src=\"{{ product?.image }}\" height=\"500px\"/>\r\n  </div>\r\n  <div class=\"center-right half\">\r\n    <div class=\"product-info\">\r\n      <h1>{{ product?.name }}</h1>\r\n      <div>\r\n        <h3>Preço</h3> <span>{{ product?.price | currency:'BRL':true:'1.2-2' }}</span>\r\n      </div>\r\n      <div>\r\n        <h3>Descrição</h3> <span>{{ product?.description }}</span>\r\n      </div>\r\n      <div>\r\n        <h3>Categoria</h3> <span>{{ product?.category }}</span>\r\n      </div>\r\n      <div>\r\n        <h3>Estoque restante</h3> <span>{{ product?.stock }}</span>\r\n      </div>\r\n\r\n      <form>\r\n        <div *ngIf=\"product?.isAvailable\" class=\"checkout\">\r\n          <label>Checkout</label>\r\n          <input required type=\"number\" name=\"quantity\" min=\"1\" [max]=\"product?.stock\" [(ngModel)]=\"qnt\">\r\n          <button type=\"button\" class=\"btn btn-success\" [class.disabled]=\"!hasStock()\" (click)=\"addToCheckout()\">+Carrinho</button>\r\n        </div>\r\n        <div class=\"admin-buttons\" *ngIf=\"isAdmin()\">\r\n          <button type=\"button\" class=\"btn btn-info\" [routerLink]=\"['/editProduct', id]\">Editar</button>\r\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteProduct()\">{{ deleteOption }}</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(97);


/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutService = (function () {
    function CheckoutService(http) {
        this.http = http;
        this.url = 'https://icommerce-api.herokuapp.com/api';
        this.products = {};
    }
    CheckoutService.prototype.resetCheckout = function () {
        this.products = {};
    };
    CheckoutService.prototype.addProductToCheckout = function (prod, qnt) {
        if (this.products[prod.id] === undefined) {
            this.products[prod.id] = prod;
            this.products[prod.id]['qnt'] = 0;
        }
        this.products[prod.id]['qnt'] += qnt;
        alert('+' + qnt + ' \'' + prod.name + '\' foi adicionado ao carrinho!');
    };
    CheckoutService.prototype.removeProductFromCheckout = function (prodID) {
        delete this.products[prodID];
        return this.getProductsToCheckout();
    };
    CheckoutService.prototype.getProductsToCheckout = function () {
        var checkoutProducts = [];
        for (var k in this.products) {
            checkoutProducts.push(this.products[k]);
        }
        return checkoutProducts;
    };
    CheckoutService.prototype.checkout = function (purch) {
        return this.http.post(this.url + '/purchase', purch)
            .map(function (res) { return res.json(); });
    };
    CheckoutService.prototype.getCheckoutProductsCount = function () {
        return Object.keys(this.products).length;
    };
    return CheckoutService;
}());
CheckoutService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], CheckoutService);

var _a;
//# sourceMappingURL=checkout.service.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModel; });
var SearchModel = (function () {
    function SearchModel(titleService) {
        this.titleService = titleService;
        this.products = [];
        this.type = '';
        this.term = '';
        this.titleService.setTitle('iCommerce - Buscar');
    }
    return SearchModel;
}());

//# sourceMappingURL=search.model.js.map

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = "<div id=\"search\">\r\n  <div class=\"container\">\r\n    <h1>Buscar {{ type }} <small>{{ term }}</small></h1>\r\n  </div>\r\n  <div class=\"media\" *ngFor=\"let prod of products\">\r\n    <div class=\"media-left\">\r\n      <a [routerLink]=\"['/product', prod.id]\">\r\n        <img class=\"media-object\" src=\"{{ prod.image }}\" alt=\"{{ prod.description }}\" height=\"72px\">\r\n      </a>\r\n    </div>\r\n    <div class=\"media-body\">\r\n      <a [routerLink]=\"['/product', prod.id]\">\r\n        <h4 class=\"media-heading\">{{ prod.name }}</h4>\r\n      </a>\r\n      <span class=\"price\">{{ prod.price | currency:'BRL':true:'1.2-2' }}</span>\r\n      <span class=\"description\">{{ prod.description }}</span>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateProduct; });
var UpdateProduct = (function () {
    function UpdateProduct(productService, router, userService) {
        var _this = this;
        this.productService = productService;
        this.router = router;
        this.userService = userService;
        this.stock = 0;
        this.action = '';
        this.createNewCategory = false;
        this.newCategory = '';
        this.gotError = {};
        if (!userService.isAdmin()) {
            this.router.navigate(['/']);
        }
        this.resetErrors();
        productService.getCategoryList().subscribe(function (data) {
            _this.categoryList = data;
        });
    }
    UpdateProduct.prototype.change = function (data) {
        this.createNewCategory = data.value === '';
        if (data.value === '') {
            this.newCategory = '';
        }
    };
    UpdateProduct.prototype.resetErrors = function (key) {
        if (key !== undefined) {
            this.gotError[key] = false;
        }
        else {
            this.gotError['name'] = false;
            this.gotError['image'] = false;
            this.gotError['description'] = false;
            this.gotError['category'] = false;
            this.gotError['price'] = false;
            this.gotError['stock'] = false;
        }
    };
    return UpdateProduct;
}());

//# sourceMappingURL=update-product.js.map

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

module.exports = "<div id=\"updateProduct\">\r\n  <form>\r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Nome do produto</label>\r\n      <input required class=\"form-control\" id=\"name\" name=\"name\" placeholder=\"Produto\"\r\n             [(ngModel)]=\"name\" #inpName=\"ngModel\" (focus)=\"resetErrors('name')\">\r\n\r\n      <div *ngIf=\"(inpName.invalid && (inpName.dirty || inpName.touched)) || gotError['name']\" class=\"alert alert-danger\">\r\n        <div *ngIf=\"inpName.errors?.required && !gotError['name']\">\r\n          Escolha um nome para o produto\r\n        </div>\r\n        <div *ngIf=\"gotError['name']\">\r\n          Nome inválido\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"description\">Imagem url</label>\r\n      <input required class=\"form-control\" id=\"image\" name=\"image\" placeholder=\"https://i.imgur.com/oFX2Q1z.jpg\"\r\n             [(ngModel)]=\"image\" #inpImg=\"ngModel\" (focus)=\"resetErrors('image')\">\r\n      <div *ngIf=\"(inpImg.invalid && (inpImg.dirty || inpImg.touched)) || gotError['image']\" class=\"alert alert-danger\">\r\n        <div *ngIf=\"inpImg.errors?.required && !gotError['image']\">\r\n          Escolha uma imagem do produto\r\n        </div>\r\n        <div *ngIf=\"gotError['image']\">\r\n          Imagem inválida\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"description\">Descrição</label>\r\n      <textarea required class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\"\r\n                [(ngModel)]=\"description\" #inpDesc=\"ngModel\" (focus)=\"resetErrors('description')\"></textarea>\r\n\r\n      <div *ngIf=\"(inpDesc.invalid && (inpDesc.dirty || inpDesc.touched)) || gotError['description']\" class=\"alert alert-danger\">\r\n        <div *ngIf=\"inpDesc.errors?.required && !gotError['description']\">\r\n          Escolha uma descrição para o produto\r\n        </div>\r\n        <div *ngIf=\"gotError['description']\">\r\n          Descrição inválida\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"category\">Categoria</label>\r\n      <select required class=\"form-control\" id=\"category\" name=\"category\"\r\n              [(ngModel)]=\"category\" #inpCat=\"ngModel\" (focus)=\"resetErrors('category')\" (change)=\"change(inpCat)\">\r\n        <option selected hidden>-- Selecione --</option>\r\n        <option *ngFor=\"let cat of categoryList\">{{ cat }}</option>\r\n        <option value=\"\">Outra...</option>\r\n      </select>\r\n\r\n      <div *ngIf=\"(inpCat.invalid && (inpCat.dirty || inpCat.touched) && !createNewCategory) || gotError['category']\" class=\"alert alert-danger\">\r\n        <div *ngIf=\"inpCat.errors?.required && !gotError['category']\">\r\n          Escolha a categoria do produto\r\n        </div>\r\n        <div *ngIf=\"gotError['category']\">\r\n          Categoria inválida\r\n        </div>\r\n      </div>\r\n      <div class=\"col-lg-6 block\" *ngIf=\"createNewCategory\">\r\n        <label for=\"newCategory\">Criar nova categoria</label>\r\n        <input class=\"form-control\" id=\"newCategory\" name=\"newCategory\" placeholder=\"Categoria nova\" [(ngModel)]=\"newCategory\">\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"price\">Preço</label>\r\n      <div class=\"input-group\">\r\n        <span class=\"input-group-addon\" id=\"price-addon\">R$</span>\r\n        <input required type=\"number\" class=\"form-control\" placeholder=\"100,00\" aria-describedby=\"price-addon\" id=\"price\" name=\"price\"\r\n               [(ngModel)]=\"price\" #inpPrice=\"ngModel\" (focus)=\"resetErrors('price')\">\r\n      </div>\r\n\r\n      <div *ngIf=\"(inpPrice.invalid && (inpPrice.dirty || inpPrice.touched) && !createNewCategory) || gotError['price']\" class=\"alert alert-danger\">\r\n        <div *ngIf=\"inpPrice.errors?.required && !gotError['price']\">\r\n          Escolha o preço do produto\r\n        </div>\r\n        <div *ngIf=\"gotError['price']\">\r\n          Preço inválido\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"stock\">Quantidade em estoque</label>\r\n      <input type=\"number\" min=\"0\" class=\"form-control\" id=\"stock\" name=\"stock\"\r\n             [(ngModel)]=\"stock\" (focus)=\"resetErrors('stock')\">\r\n      <div *ngIf=\"gotError['stock']\" class=\"alert alert-danger\">\r\n        Estoque inválido\r\n      </div>\r\n    </div>\r\n    <div class=\"centralize-button\">\r\n      <button (click)=\"submit()\" class=\"btn btn-success\" aria-haspopup=\"true\">{{ action }}</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 96;


/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(115);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ })

},[225]);
//# sourceMappingURL=main.bundle.js.map