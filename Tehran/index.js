(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Tehran Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Iran\'s sprawling capital deserves, from Karaj to Mehrabad and Imam Khomeini International Airport.',
            notification: 'Welcome to Tehran!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la vaste capitale iranienne, de Karaj a Mehrabad et l\'aeroport international Imam Khomeini.',
            notification: 'Bienvenue a Teheran !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Tehran',
        code: 'THR',
        description: t('description'),
        population: 7962850,
        initialViewState: { zoom: 10, latitude: 35.7, longitude: 51.4, bearing: 0 }
    });

    api.cities.registerTab({ id: 'iran-thr', label: 'Iran', cityCodes: ['THR'] });

    api.map.setTileURLOverride({
        cityCode: 'THR',
        tilesUrl: 'http://127.0.0.1:8080/THR/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/THR_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('THR', {
        buildingsIndex: '/data/THR/buildings_index.bin.gz',
        demandData: '/data/THR/demand_data.json.gz',
        roads: '/data/THR/roads.geojson.gz',
        runwaysTaxiways: '/data/THR/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/THR/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/THR/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'THR') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Tehran mod loaded successfully!');
})();
