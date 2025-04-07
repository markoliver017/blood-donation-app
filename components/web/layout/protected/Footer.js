export default function Footer() {
    return (
        <footer className="bg-gray-200 text-center p-4 text-gray-700 shadow-md">
            © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer>
    );
}
