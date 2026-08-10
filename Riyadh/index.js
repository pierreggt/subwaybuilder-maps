(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Riyadh Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Saudi Arabia\'s fast-growing capital deserves, from King Khalid Airport to Diriyah.',
            notification: 'Welcome to Riyadh!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la capitale saoudienne en pleine croissance, de l\'aeroport King Khalid a Diriyah.',
            notification: 'Bienvenue a Riyad !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Riyadh',
        code: 'RUH',
        description: t('description'),
        population: 3552550,
        initialViewState: { zoom: 10, latitude: 24.71, longitude: 46.70, bearing: 0 }
    });

    api.cities.registerTab({ id: 'saudi-ruh', label: 'Saudi Arabia', cityCodes: ['RUH'] });

    api.map.setTileURLOverride({
        cityCode: 'RUH',
        tilesUrl: 'http://127.0.0.1:8080/RUH/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/RUH_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('RUH', {
        buildingsIndex: '/data/RUH/buildings_index.bin.gz',
        demandData: '/data/RUH/demand_data.json.gz',
        roads: '/data/RUH/roads.geojson.gz',
        runwaysTaxiways: '/data/RUH/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/RUH/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/RUH/ocean_depth_index_contours.json.gz'
    });

    api.map.setLayerOverride({
        layerId: 'parks-large',
        sourceLayer: 'landuse',
        filter: ['in', ['get', 'kind'], ['literal',
            ['park','garden','nature_reserve','grass','cemetery','golf_course',
             'forest','wood','meadow','village_green','recreation_ground','pitch','zoo','allotments']]]
    });

    api.map.setLayerOverride({
        layerId: 'airports',
        sourceLayer: 'landuse',
        filter: ['==', ['get', 'kind'], 'aerodrome']
    });

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'RUH') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Riyadh mod loaded successfully!');
})();
