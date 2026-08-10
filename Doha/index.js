(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Doha Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro connecting Hamad International Airport to Lusail, following the Doha Metro network.',
            notification: 'Welcome to Doha!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro reliant l\'aeroport international Hamad a Lusail, sur le trace du reseau Doha Metro.',
            notification: 'Bienvenue a Doha !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Doha',
        code: 'DOH',
        description: t('description'),
        population: 1071450,
        initialViewState: { zoom: 12, latitude: 25.29, longitude: 51.53, bearing: 0 }
    });

    api.cities.registerTab({ id: 'qatar-doh', label: 'Qatar', cityCodes: ['DOH'] });

    api.map.setTileURLOverride({
        cityCode: 'DOH',
        tilesUrl: 'http://127.0.0.1:8080/DOH/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/DOH_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('DOH', {
        buildingsIndex: '/data/DOH/buildings_index.bin.gz',
        demandData: '/data/DOH/demand_data.json.gz',
        roads: '/data/DOH/roads.geojson.gz',
        runwaysTaxiways: '/data/DOH/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/DOH/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/DOH/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'DOH') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Doha mod loaded successfully!');
})();
