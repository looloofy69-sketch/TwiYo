import { Route, Switch, useParams } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteLayout } from "./components/SiteShell";
import { CartProvider } from "./contexts/CartContext";
import HomePage from "./pages/Home";
import { CartPage, CheckoutPage, ConfirmationPage, ProductPage, ShopPage } from "./pages/Shop";
import { EnquiryPage, ServicePage, ServicesPage } from "./pages/Services";
import { AboutPage, AdminPreviewPage, ContactPage, PolicyPage } from "./pages/Info";
import NotFound from "./pages/NotFound";

function ProductRoute() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <ProductPage key={slug} />;
}

function Routes() {
  return <SiteLayout><Switch>
    <Route path="/" component={HomePage}/>
    <Route path="/shop" component={ShopPage}/>
    <Route path="/products/:slug" component={ProductRoute}/>
    <Route path="/cart" component={CartPage}/>
    <Route path="/checkout" component={CheckoutPage}/>
    <Route path="/order-confirmation" component={ConfirmationPage}/>
    <Route path="/services" component={ServicesPage}/>
    <Route path="/services/:slug" component={ServicePage}/>
    <Route path="/enquiry" component={EnquiryPage}/>
    <Route path="/about" component={AboutPage}/>
    <Route path="/contact" component={ContactPage}/>
    <Route path="/policies/privacy" component={() => <PolicyPage kind="privacy"/>}/>
    <Route path="/policies/terms" component={() => <PolicyPage kind="terms"/>}/>
    <Route path="/policies/delivery-returns" component={() => <PolicyPage kind="delivery-returns"/>}/>
    <Route path="/policies/cookies" component={() => <PolicyPage kind="cookies"/>}/>
    <Route path="/admin-preview" component={AdminPreviewPage}/>
    <Route path="/404" component={NotFound}/>
    <Route component={NotFound}/>
  </Switch></SiteLayout>;
}

export default function App() {
  return <ErrorBoundary><CartProvider><Routes/></CartProvider></ErrorBoundary>;
}
