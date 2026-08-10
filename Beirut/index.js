(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Beirut Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Beirut never had, from Rafic Hariri International Airport to Jounieh.',
            notification: 'Welcome to Beirut!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que Beyrouth n\'a jamais eu, de l\'aeroport Rafic Hariri a Jounieh.',
            notification: 'Bienvenue a Beyrouth !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Beirut',
        code: 'BEY',
        description: t('description'),
        population: 882100,
        initialViewState: { zoom: 12, latitude: 33.8938, longitude: 35.5018, bearing: 0 }
    });

    api.cities.registerTab({ id: 'lebanon-bey', label: 'Lebanon', cityCodes: ['BEY'] });

    api.map.setTileURLOverride({
        cityCode: 'BEY',
        tilesUrl: 'http://127.0.0.1:8080/BEY/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/BEY_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BEY', {
        buildingsIndex: '/data/BEY/buildings_index.bin.gz',
        demandData: '/data/BEY/demand_data.json.gz',
        roads: '/data/BEY/roads.geojson.gz',
        runwaysTaxiways: '/data/BEY/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BEY/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BEY/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'BEY') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Beirut mod loaded successfully!');
})();
