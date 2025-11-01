import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  CreditCard,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Account = () => {
  const { cartItems, cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joined: "March 2023",
  };

  // Mock order data
  const orders = [
    {
      id: "ORD-1234",
      date: "April 12, 2024",
      status: "Delivered",
      total: 129.99,
      items: 2,
    },
    {
      id: "ORD-9876",
      date: "March 28, 2024",
      status: "Processing",
      total: 85.5,
      items: 1,
    },
  ];

  // Mock address data
  const addresses = [
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
      default: true,
    },
    {
      id: 2,
      name: "Work",
      street: "456 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
      default: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Account sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white border rounded-lg p-6 sticky top-24">
                {/* User info */}
                <div className="flex items-center gap-4 pb-6 border-b mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Member since {user.joined}
                    </p>
                  </div>
                </div>

                {/* Navigation menu */}
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link to="/account">
                      <User className="mr-2" size={18} />
                      My Account
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link to="/account/orders">
                      <Package className="mr-2" size={18} />
                      Orders
                      <span className="ml-auto bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                        {orders.length}
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link to="/account">
                      <ShoppingBag className="mr-2" size={18} />
                      Cart
                      {cartCount > 0 && (
                        <span className="ml-auto bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link to="/account/addresses">
                      <MapPin className="mr-2" size={18} />
                      Addresses
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link to="/account/payment">
                      <CreditCard className="mr-2" size={18} />
                      Payment Methods
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link to="/account/settings">
                      <Settings className="mr-2" size={18} />
                      Account Settings
                    </Link>
                  </Button>
                </nav>

                <div className="mt-8 pt-6 border-t">
                  <Button variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-9">
              <h1 className="text-3xl font-bold mb-6">My Account</h1>

              {/* Account overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Package className="mr-2" size={18} />
                      Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{orders.length}</p>
                    <p className="text-sm text-gray-500">Recent orders</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ShoppingBag className="mr-2" size={18} />
                      Cart
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{cartCount}</p>
                    <p className="text-sm text-gray-500">Items in cart</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ShieldCheck className="mr-2" size={18} />
                      Account Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-green-600">Active</p>
                    <p className="text-sm text-gray-500">Member for 1 year</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="orders" className="space-y-6">
                <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-3">
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Orders tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        View and manage your recent orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length === 0 ? (
                        <div className="text-center py-10">
                          <Package className="h-12 w-12 mx-auto text-gray-300" />
                          <h3 className="mt-4 text-lg font-medium text-gray-900">
                            No orders yet
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Start shopping to see your orders here
                          </p>
                          <div className="mt-6">
                            <Button asChild>
                              <Link to="/shop">Browse Products</Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div
                              key={order.id}
                              className="bg-gray-50 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4"
                            >
                              <div>
                                <p className="font-medium text-green-default">
                                  {order.id}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.date}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">
                                    {order.items}
                                  </span>
                                  <span className="text-gray-500">
                                    {" "}
                                    {order.items === 1 ? "item" : "items"}
                                  </span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">
                                  ${order.total.toFixed(2)}
                                </p>
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                                size="sm"
                              >
                                View Order
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Addresses tab */}
                <TabsContent value="addresses">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Your Addresses</CardTitle>
                        <CardDescription>
                          Manage your shipping and billing addresses
                        </CardDescription>
                      </div>
                      <Button size="sm">Add Address</Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className={`border rounded-lg p-4 ${
                              address.default
                                ? "border-green-300 bg-green-50/50"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{address.name}</h3>
                              {address.default && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.street}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                              {address.country}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                              {!address.default && (
                                <Button size="sm" variant="outline">
                                  Set as Default
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings tab */}
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account settings and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Profile section */}
                        <div className="border-b pb-6">
                          <h3 className="font-medium mb-4">
                            Profile Information
                          </h3>
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="w-full sm:w-auto sm:flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                defaultValue={user.name}
                                className="w-full border-gray-300 rounded-md p-2 border"
                              />
                            </div>
                            <div className="w-full sm:w-auto sm:flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <input
                                type="email"
                                defaultValue={user.email}
                                className="w-full border-gray-300 rounded-md p-2 border"
                              />
                            </div>
                          </div>
                          <Button size="sm">Update Profile</Button>
                        </div>

                        {/* Password section */}
                        <div className="border-b pb-6">
                          <h3 className="font-medium mb-4">Change Password</h3>
                          <div className="space-y-3 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="w-full border-gray-300 rounded-md p-2 border"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="w-full border-gray-300 rounded-md p-2 border"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="w-full border-gray-300 rounded-md p-2 border"
                              />
                            </div>
                          </div>
                          <Button size="sm">Change Password</Button>
                        </div>

                        {/* Notification preferences */}
                        <div>
                          <h3 className="font-medium mb-4">
                            Notification Preferences
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Order updates</p>
                                <p className="text-sm text-gray-500">
                                  Receive updates about your orders
                                </p>
                              </div>
                              <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Product news</p>
                                <p className="text-sm text-gray-500">
                                  Receive updates about new products
                                </p>
                              </div>
                              <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  Discount and promotions
                                </p>
                                <p className="text-sm text-gray-500">
                                  Receive information about deals and promotions
                                </p>
                              </div>
                              <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                              />
                            </div>
                          </div>
                          <Button size="sm" className="mt-4">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
