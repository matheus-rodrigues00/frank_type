module Typing
  class TextNormalizer
    ACCENTED_LOCALES = { "pt-BR" => "àáâãçéêíóôõúü" }.freeze

    def self.call(text, locale: nil)
      new(text, locale: locale).call
    end

    def initialize(text, locale: nil)
      @text = text.to_s
      @locale = locale
    end

    def call
      accents = ACCENTED_LOCALES[@locale.to_s]
      return normalize_ascii if accents.nil?

      normalize_with_accents(accents)
    end

    private

    def normalize_ascii
      @text
        .unicode_normalize(:nfkc)
        .then { |value| I18n.transliterate(value) }
        .downcase
        .gsub(/[^a-z0-9\s]/, " ")
        .squeeze(" ")
        .strip
    end

    def normalize_with_accents(accents)
      @text
        .unicode_normalize(:nfc)
        .downcase
        .gsub(/[^a-z0-9#{Regexp.escape(accents)}\s]/, " ")
        .squeeze(" ")
        .strip
    end
  end
end
