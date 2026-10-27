import { describe, expect, it } from 'vitest'
import { countryAt, countryBorders, countryLabels } from '../data/countries.ts'
import { labelRankLimit, labelSizeForAltitude, selectCountryLabels } from '../lib/countryLabels.ts'

describe('country borders', () => {
  it('uses dataset ISO codes for the sample countries and leaves unlabeled gaps', () => {
    const byName = new Map(countryBorders.map((country) => [country.name, country.code]))
    expect(byName.get('Kenya')).toBe('KEN')
    expect(byName.get('Tanzania')).toBe('TZA')
    expect(byName.get('Uganda')).toBe('UGA')
    expect(byName.get('Ethiopia')).toBe('ETH')
    expect(byName.get('France')).toBe('FRA')
    expect(byName.get('Norway')).toBe('NOR')
    expect(byName.get('United States of America')).toBe('USA')
    expect(byName.get('China')).toBe('CHN')
    expect(byName.get('United Kingdom')).toBe('GBR')
    expect(byName.get('Australia')).toBe('AUS')
    expect(byName.get('Brazil')).toBe('BRA')
    expect(byName.get('Kosovo')).toBeNull()
    expect(byName.get('Somaliland')).toBeNull()
    expect(byName.get('N. Cyprus')).toBeNull()
    for (const label of countryLabels) expect(label.text).toMatch(/^[A-Z]{3}$/)
  })

  it('identifies land inside a country and leaves the ocean empty', () => {
    expect(countryAt(-1.29, 36.82)).toEqual({ code: 'KEN', name: 'Kenya' })
    expect(countryAt(-6.16, 35.75)).toEqual({ code: 'TZA', name: 'Tanzania' })
    expect(countryAt(0.35, 32.58)).toEqual({ code: 'UGA', name: 'Uganda' })
    expect(countryAt(9.03, 38.74)).toEqual({ code: 'ETH', name: 'Ethiopia' })
    expect(countryAt(48.86, 2.35)).toEqual({ code: 'FRA', name: 'France' })
    expect(countryAt(61.3, 9.6)).toEqual({ code: 'NOR', name: 'Norway' })
    expect(countryAt(39.5, -98.3)?.code).toBe('USA')
    expect(countryAt(32.5, 106.3)?.code).toBe('CHN')
    expect(countryAt(54.4, -2.1)?.code).toBe('GBR')
    expect(countryAt(-24.1, 134)?.code).toBe('AUS')
    expect(countryAt(-12.1, -49.5)?.code).toBe('BRA')
    expect(countryAt(0, -30)).toBeNull()
    expect(countryAt(-20, 80)).toBeNull()
    expect(countryAt(35, 18)).toBeNull()
    expect(countryAt(-85, 0)?.code).toBe('ATA')
    expect(countryAt(0, 180)).toBeNull()
  })
})

describe('country label density', () => {
  it('shows large countries first and hides labels that share the same screen space', () => {
    expect(labelRankLimit(2.4)).toBe(2)
    expect(labelRankLimit(1.4)).toBe(3)
    expect(labelRankLimit(0.4)).toBe(4)
    expect(labelSizeForAltitude(0.4)).toBeLessThan(labelSizeForAltitude(2.4))

    const visible = selectCountryLabels(
      [
        { text: 'FRA', rank: 2, area: 50, x: 100, y: 100, front: true },
        { text: 'BEL', rank: 2, area: 4, x: 112, y: 108, front: true },
        { text: 'DEU', rank: 2, area: 40, x: 180, y: 100, front: true },
        { text: 'RUS', rank: 2, area: 200, x: 400, y: 80, front: false },
        { text: 'LUX', rank: 6, area: 1, x: 300, y: 200, front: true },
      ],
      2,
      30,
      18,
    )
    expect(visible.map((label) => label.text)).toEqual(['FRA', 'DEU'])
  })
})
