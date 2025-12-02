import dynamic from "next/dynamic";
import { Coords } from "@/types/coords";

interface YandexMapProps {
  coords?: Coords;
  allCoords?: Coords[];
}

const YandexMapComponent = dynamic<{
  coords?: Coords;
  allCoords?: Coords[];
}>(
  () =>
    import("@iminside/react-yandex-maps").then((mod) => {
      const { YMaps, Map, Placemark } = mod;
      return ({ coords, allCoords }: YandexMapProps) => (
        <div className="rounded-2xl overflow-hidden">
          <YMaps
            query={{
              lang: "ru_RU",
            }}
          >
            {coords && (
              <Map
                state={{ center: coords, zoom: 15 }}
                width="100%"
                height="100%"
              >
                <Placemark geometry={coords} />
              </Map>
            )}

            {allCoords && (
              <Map
                state={{ center: [50, 80], zoom: 3 }}
                width="100%"
                height="100%"
              >
                {allCoords.length !== 0 &&
                  allCoords.map((coords, i) => (
                    <Placemark key={i} geometry={coords} />
                  ))}
              </Map>
            )}
          </YMaps>
        </div>
      );
    }),
  { ssr: false }
);

export default YandexMapComponent;
