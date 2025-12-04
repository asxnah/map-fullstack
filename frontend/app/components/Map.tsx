import dynamic from "next/dynamic";

interface YandexMapProps {
  placemark?: PlacemarkProps;
  placemarkList?: PlacemarkProps[];
  onClick: (id: string) => void;
}

const YandexMapComponent = dynamic<{
  placemark?: PlacemarkProps;
  placemarkList?: PlacemarkProps[];
  onClick: (id: string) => void;
}>(
  () =>
    import("@iminside/react-yandex-maps").then((mod) => {
      const { YMaps, Map, Placemark } = mod;

      const getPlacemarkColor = (status: string) => {
        switch (status) {
          case "notSpecified":
            return "#adb5bd";
          case "active":
            return "#8ac926";
          case "inactive":
            return "#ff595e";
          case "inProgress":
            return "#ffca3a";
          default:
            return "#adb5bd";
        }
      };

      const Component = ({
        placemark,
        placemarkList,
        onClick,
      }: YandexMapProps) => (
        <div className="h-full w-full rounded-2xl overflow-hidden">
          <YMaps
            query={{
              lang: "ru_RU",
            }}
          >
            {placemark && (
              <Map
                state={{ center: placemark.coords, zoom: 15 }}
                width="100%"
                height="100%"
              >
                <Placemark
                  geometry={placemark.coords}
                  options={{
                    iconColor: getPlacemarkColor(placemark.status),
                  }}
                  onClick={() => onClick(placemark.sourceID)}
                />
              </Map>
            )}

            {placemarkList && (
              <Map
                state={{ center: [50, 80], zoom: 3 }}
                width="100%"
                height="100%"
              >
                {placemarkList.length !== 0 &&
                  placemarkList.map((placemark, i) => (
                    <Placemark
                      key={i}
                      geometry={placemark.coords}
                      options={{
                        iconColor: getPlacemarkColor(placemark.status),
                      }}
                      onClick={() => onClick(placemark.sourceID)}
                    />
                  ))}
              </Map>
            )}
          </YMaps>
        </div>
      );
      Component.displayName = "YandexMapComponent";
      return Component;
    }),
  { ssr: false }
);

export default YandexMapComponent;
