export function Footer() {
    return (
        <footer className="py-6 text-center text-sm md:text-base text-gray-500">
            <p>
                Todos os direitos reservados © {new Date().getFullYear()} -
                <span className="hover:text-black duration-300">
                    @gabriel-smartins.
                </span>
            </p>
        </footer>
    )
}
