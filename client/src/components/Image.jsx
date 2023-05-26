export default function Image({ src, ...rest }) {
	src =
		src && src.includes("https://")
			? src
			: "https://haneulbnb-backend.onrender.com/uploads/" + src;
	return <img {...rest} src={src} alt="" />;
}
