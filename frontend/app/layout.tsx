"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});

export default function RootLayout({ children }) {
    return (
        <ApolloProvider client={client}>
            <html>
                <body className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </body>
            </html>
        </ApolloProvider>
    );
}
